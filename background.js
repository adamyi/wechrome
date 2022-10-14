let wechatHeaders = {
  extspam:
    "Go8FCIkFEokFCggwMDAwMDAwMRAGGvAESySibk50w5Wb3uTl2c2h64jVVrV7gNs06GFlWplHQbY/5FfiO++1yH4ykCyNPWKXmco+wfQzK5R98D3so7rJ5LmGFvBLjGceleySrc3SOf2Pc1gVehzJgODeS0lDL3/I/0S2SSE98YgKleq6Uqx6ndTy9yaL9qFxJL7eiA/R3SEfTaW1SBoSITIu+EEkXff+Pv8NHOk7N57rcGk1w0ZzRrQDkXTOXFN2iHYIzAAZPIOY45Lsh+A4slpgnDiaOvRtlQYCt97nmPLuTipOJ8Qc5pM7ZsOsAPPrCQL7nK0I7aPrFDF0q4ziUUKettzW8MrAaiVfmbD1/VkmLNVqqZVvBCtRblXb5FHmtS8FxnqCzYP4WFvz3T0TcrOqwLX1M/DQvcHaGGw0B0y4bZMs7lVScGBFxMj3vbFi2SRKbKhaitxHfYHAOAa0X7/MSS0RNAjdwoyGHeOepXOKY+h3iHeqCvgOH6LOifdHf/1aaZNwSkGotYnYScW8Yx63LnSwba7+hESrtPa/huRmB9KWvMCKbDThL/nne14hnL277EDCSocPu3rOSYjuB9gKSOdVmWsj9Dxb/iZIe+S6AiG29Esm+/eUacSba0k8wn5HhHg9d4tIcixrxveflc8vi2/wNQGVFNsGO6tB5WF0xf/plngOvQ1/ivGV/C1Qpdhzznh0ExAVJ6dwzNg7qIEBaw+BzTJTUuRcPk92Sn6QDn2Pu3mpONaEumacjW4w6ipPnPw+g2TfywJjeEcpSZaP4Q3YV5HG8D6UjWA4GSkBKculWpdCMadx0usMomsSS/74QgpYqcPkmamB4nVv1JxczYITIqItIKjD35IGKAUwAA==",
  "client-version": "2.0.0",
};

let wechatUrls = ["https://wx.qq.com/*", "https://web.wechat.com/*", "https://wx2.qq.com/*", "https://wx8.qq.com/*"];

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    let url = new URL(details.url);
    if (url.pathname == "/" && url.search.indexOf("target=t") == -1) {
      if (url.search == "" || url.search == "?") {
        url.search = "?";
      } else {
        url.search += "&";
      }
      url.search += "target=t";
      return { redirectUrl: url.href };
    }
    return {};
  },
  { urls: wechatUrls },
  ["blocking"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    let url = new URL(details.url);
    if (url.pathname == "/cgi-bin/mmwebwx-bin/webwxnewloginpage") {
      for (var k in wechatHeaders) {
        details.requestHeaders.push({
          name: k,
          value: wechatHeaders[k],
        });
      }
      return { requestHeaders: details.requestHeaders };
    }
    return {};
  },
  { urls: wechatUrls },
  ["blocking", "requestHeaders"]
);
