addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  // 替换目标域名
  const targetUrl = url.pathname.replace('/huggingface.co/', 'https://huggingface.co/');
  
  // 构建新请求
  const newRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body
  });
  
  // 发起代理请求
  const response = await fetch(newRequest);
  
  // 修改响应头以允许跨域
  const newHeaders = new Headers(response.headers);
  newHeaders.set('Access-Control-Allow-Origin', '*');
  
  return new Response(response.body, {
    status: response.status,
    headers: newHeaders
  });
}
