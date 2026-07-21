"""Pruebas de salud, autenticación y administración de cursos de la API."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://clarity-decidir.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@cresara.com"
ADMIN_PASSWORD = "cresara2026"


@pytest.fixture(scope="session")
def public_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def auth_client():
    """Authenticated session that uses cookie-based auth (httpOnly)."""
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, f"Admin login failed: {r.status_code} {r.text}"
    assert "access_token" in s.cookies, "access_token cookie not set on login"
    return s


# -------------------- Estado del servicio --------------------
class TestHealth:
    def test_health_ok(self, public_client):
        r = public_client.get(f"{API}/health", timeout=10)
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert data.get("service") == "cresara"


# -------------------- Autenticación --------------------
class TestAuth:
    def test_login_success_sets_cookie(self, public_client):
        s = requests.Session()
        r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=10)
        assert r.status_code == 200
        body = r.json()
        assert body["email"] == ADMIN_EMAIL
        assert body["role"] == "admin"
        assert "id" in body and isinstance(body["id"], str)
        # El inicio de sesión debe crear la cookie.
        assert "access_token" in s.cookies
        # Comprueba los atributos httpOnly y Secure en la cabecera Set-Cookie.
        set_cookie = r.headers.get("set-cookie", "").lower()
        assert "httponly" in set_cookie, f"httpOnly missing: {set_cookie}"
        assert "secure" in set_cookie, f"Secure missing: {set_cookie}"

    def test_login_wrong_password(self, public_client):
        r = public_client.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrongpass"}, timeout=10)
        assert r.status_code == 401

    def test_login_unknown_user(self, public_client):
        r = public_client.post(f"{API}/auth/login", json={"email": "nope@cresara.com", "password": "x"}, timeout=10)
        assert r.status_code == 401

    def test_me_without_cookie_401(self, public_client):
        s = requests.Session()
        r = s.get(f"{API}/auth/me", timeout=10)
        assert r.status_code == 401

    def test_me_with_cookie_returns_admin(self, auth_client):
        r = auth_client.get(f"{API}/auth/me", timeout=10)
        assert r.status_code == 200
        data = r.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"


# -------------------- Cursos públicos --------------------
class TestCoursesPublic:
    def test_list_courses_seeded(self, public_client):
        r = public_client.get(f"{API}/courses", timeout=15)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert len(items) >= 9, f"Expected at least 9 seeded courses, got {len(items)}"
        # Comprueba la estructura pública del curso.
        c = items[0]
        for f in ("id", "title", "description", "category", "featured", "created_at", "updated_at"):
            assert f in c
        assert c["category"] in ("mujeres", "hombres", "relaciones")

    @pytest.mark.parametrize("cat", ["mujeres", "hombres", "relaciones"])
    def test_filter_by_category(self, public_client, cat):
        r = public_client.get(f"{API}/courses", params={"category": cat}, timeout=10)
        assert r.status_code == 200
        items = r.json()
        assert len(items) >= 1
        for c in items:
            assert c["category"] == cat

    def test_filter_featured_true(self, public_client):
        r = public_client.get(f"{API}/courses", params={"featured": "true"}, timeout=10)
        assert r.status_code == 200
        items = r.json()
        assert len(items) >= 1
        for c in items:
            assert c["featured"] is True

    def test_get_course_by_id(self, public_client):
        r = public_client.get(f"{API}/courses", timeout=10)
        cid = r.json()[0]["id"]
        r2 = public_client.get(f"{API}/courses/{cid}", timeout=10)
        assert r2.status_code == 200
        assert r2.json()["id"] == cid

    def test_get_course_404(self, public_client):
        r = public_client.get(f"{API}/courses/non-existent-id-xyz", timeout=10)
        assert r.status_code == 404


# -------------------- Administración autenticada de cursos --------------------
class TestCoursesCRUD:
    created_id = None

    def test_create_unauthenticated_401(self, public_client):
        s = requests.Session()
        r = s.post(f"{API}/courses", json={
            "title": "TEST_unauth", "description": "x", "category": "mujeres"
        }, timeout=10)
        assert r.status_code == 401

    def test_update_unauthenticated_401(self, public_client):
        s = requests.Session()
        r = s.put(f"{API}/courses/abc", json={"title": "x"}, timeout=10)
        assert r.status_code == 401

    def test_delete_unauthenticated_401(self, public_client):
        s = requests.Session()
        r = s.delete(f"{API}/courses/abc", timeout=10)
        assert r.status_code == 401

    def test_create_course(self, auth_client):
        payload = {
            "title": "TEST_Curso E2E",
            "description": "Descripcion de prueba e2e",
            "short_description": "corto",
            "category": "mujeres",
            "image_url": "https://example.com/i.jpg",
            "video_url": "https://www.youtube.com/embed/abc",
            "extra_content": "extra",
            "featured": False,
        }
        r = auth_client.post(f"{API}/courses", json=payload, timeout=10)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["title"] == payload["title"]
        assert data["featured"] is False
        assert "id" in data
        TestCoursesCRUD.created_id = data["id"]

        # Comprueba la persistencia mediante la consulta pública.
        r2 = requests.get(f"{API}/courses/{data['id']}", timeout=10)
        assert r2.status_code == 200
        assert r2.json()["title"] == payload["title"]

    def test_update_course(self, auth_client):
        cid = TestCoursesCRUD.created_id
        assert cid, "No created course id"
        r = auth_client.put(f"{API}/courses/{cid}", json={"featured": True, "title": "TEST_Curso Updated"}, timeout=10)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["featured"] is True
        assert d["title"] == "TEST_Curso Updated"
        # Comprueba que la actualización quedó guardada.
        r2 = requests.get(f"{API}/courses/{cid}", timeout=10)
        assert r2.status_code == 200
        assert r2.json()["featured"] is True

    def test_invalid_category_rejected(self, auth_client):
        r = auth_client.post(f"{API}/courses", json={
            "title": "TEST_invalid", "description": "d", "category": "invalid_cat"
        }, timeout=10)
        assert r.status_code == 422

    def test_delete_course(self, auth_client):
        cid = TestCoursesCRUD.created_id
        r = auth_client.delete(f"{API}/courses/{cid}", timeout=10)
        assert r.status_code == 200
        # Comprueba que el curso ya no existe.
        r2 = requests.get(f"{API}/courses/{cid}", timeout=10)
        assert r2.status_code == 404

    def test_delete_nonexistent_404(self, auth_client):
        r = auth_client.delete(f"{API}/courses/non-existent-xyz", timeout=10)
        assert r.status_code == 404


# -------------------- Cierre de sesión --------------------
class TestLogout:
    def test_logout_clears_cookie(self):
        s = requests.Session()
        r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=10)
        assert r.status_code == 200
        r2 = s.post(f"{API}/auth/logout", timeout=10)
        assert r2.status_code == 200
        # Después de salir, la cookie access_token debe quedar eliminada.
        # Una sesión nueva sin cookie debe recibir 401 en /auth/me.
        s3 = requests.Session()
        assert s3.get(f"{API}/auth/me", timeout=10).status_code == 401
