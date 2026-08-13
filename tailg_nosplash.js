(function () {
  // Loon response body 修改脚本
  // 仅在能成功解析 JSON 且存在 data 对象时修改下面三个字段
  // 否则保持原始响应不变

  let body = $response && $response.body ? $response.body : null;
  if (!body) {
    // 没有 body，直接返回原始响应
    $done({});
    return;
  }

  try {
    const obj = JSON.parse(body);

    // 只有当 obj.data 存在且为对象时才修改
    if (obj && typeof obj === 'object' && obj.data && typeof obj.data === 'object') {
      // 只修改这三个字段，严格按要求设置为字符串或空字符串
      obj.data.isShow = "0";
      obj.data.homeResource = "";
      obj.data.durationTime = "0";

      $done({ body: JSON.stringify(obj) });
      return;
    }
  } catch (e) {
    // 解析失败 — 必须保持原始响应，不做任何修改
  }

  // 默认返回原始响应体（未修改或解析失败）
  $done({ body });
})();
