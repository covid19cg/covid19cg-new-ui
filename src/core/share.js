export const openSharingLink = function (message) {
  const shareUri = `https://www.addtoany.com/share#url=${encodeURI(
    window.location.href
  )}&title=${encodeURI(message)}`;

  const h = 500;
  const w = 500;
  const left = window.screen.width / 2 - w / 2;
  const top = window.screen.height / 2 - h / 2;
  return window.open(
    shareUri,

    document.title,
    'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
    w +
    ', height=' +
    h +
    ', top=' +
    top +
    ', left=' +
    left
  );
};

export const openSharingTray = function () {
  const message =
    'Discover nearest coronavirus support and essential service providers such as testing lab centres, accommodation shelters and vegetable vendors at ';
  if (navigator.share !== undefined) {
    navigator
      .share({
        title: document.title,
        text: message,
        url: window.location.href,
      })
      .then()
      .catch((error) => { });
  } else {
    openSharingLink(message);
  }
};
