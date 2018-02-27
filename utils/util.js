const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const getNowTimestamp = any =>{
  return (Date.parse(new Date()) / 1000);
}

const inArray = (search, array) => {
  for (var i in array) {
    if (array[i] == search) {
      return true;
    }
  }
  return false;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  getNowTimestamp: getNowTimestamp,
  inArray: inArray
}
