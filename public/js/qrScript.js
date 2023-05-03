console.log('QR script is running.')

if (document.getElementById('keepID')) {
    document.addEventListener('DOMContentLoaded', setQRcode(), false)
}

function setQRcode(){
    const ID = document.getElementById('keepID').innerText
    const QRimage = document.getElementById('QRimage')
    QRimage.src = `https://api.qrserver.com/v1/create-qr-code/?data=${ID}&size=250x250`
}