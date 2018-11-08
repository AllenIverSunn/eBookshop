const EARTH_RADIUS = 6378.137;

function rad(d) {
  return d * Math.PI / 180.0;
}

function GetDistance(lat1, lng1, lat2, lng2) {
  const radLat1 = rad(lat1);
  const radLat2 = rad(lat2);
  const a = radLat1 - radLat2;
  const b = rad(lng1) - rad(lng2);

  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    (Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2))));
  s = s * EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;

  return s * 1000;
}

module.exports = {
  GetDistance
};
