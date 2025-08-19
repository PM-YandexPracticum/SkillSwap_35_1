const URL = null;

// Типы
type TServerResponse<T> = {
  success: boolean;
} & T;

// Типы
type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

// Проверка ответа сервера.
function checkResponse(res: Response) {
  return res.ok
    ? res.json()
    : res
        .json()
        .then((err) => Promise.reject({ ...err, statusCode: res.status }));
}

// Базовый запрос. ВАЖНО: Указать нужный эндпоинт!
async function request(endpoint: string, options: RequestInit = {}) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const headers = {
      'Content-Type': 'application/json',
      ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers
    };

    const res = await fetch(`${URL}/api/${endpoint}`, {
      ...options,
      headers
    });
    return await checkResponse(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

// Обновление токена. ВАЖНО: Указать нужный эндпоинт!
function refreshToken() {
  return request('auth/token', {
    method: 'POST',
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  });
}

// Запрос с автоматическим обновлением токена.
async function fetchWithRefresh(endpoint: string, options: RequestInit = {}) {
  try {
    return await request(endpoint, options);
  } catch (error: any) {
    if (error.statusCode === 401 || error.statusCode === 403) {
      const refreshData: TRefreshResponse = await refreshToken();

      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }

      localStorage.setItem('accessToken', refreshData.accessToken);
      localStorage.setItem('refreshToken', refreshData.refreshToken);

      return await request(endpoint, options);
    }
    return Promise.reject(error);
  }
}

// Экспорты.
export { request, fetchWithRefresh, refreshToken };
export type { TServerResponse, TRefreshResponse };
