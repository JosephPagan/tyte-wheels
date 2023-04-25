document.addEventListener('DOMContentLoaded', weatherRequest(), false)

const deleteButton = document.getElementById('endKeepBtn')

deleteButton.addEventListener('click', endKeep)

function weatherRequest () {
    const userZip = document.getElementById('userZipCode').innerText

    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=875f8faa91a844a6a2d154059231404&q=${userZip}&days=3`;

    fetch(apiUrl, {
        headers: {
            "content-type":"application/json"
        }
    })
        .then( (data) => data.json())
        .then( (result) => {
            console.log(result)
            const currentImage = result.current.condition.icon;
            const image2 = result.forecast.forecastday[1].day.condition.icon
            const image3 = result.forecast.forecastday[2].day.condition.icon

            const forecastArray = result.forecast.forecastday;

            let formattedDateArray = []
            
            for (x = 0; x < forecastArray.length; x++) {
                let eachDateArray = forecastArray[x].date.split('-')
                let formattedDate = eachDateArray[1] + '/' + eachDateArray[2]
                formattedDateArray.push(formattedDate)
            }

            document.getElementById('location').innerText = result.location.name

            document.getElementById('date1').innerText = formattedDateArray[0]
            document.getElementById('weatherImg1').src = currentImage
            document.getElementById('condition1').innerText = result.current.condition.text
            document.getElementById('tempF1').innerText = result.current.temp_f
        
            document.getElementById('date2').innerText = formattedDateArray[1]
            document.getElementById('weatherImg2').src = image2
            document.getElementById('condition2').innerText = result.forecast.forecastday[1].day.condition.text
            document.getElementById('tempF2').innerText = result.forecast.forecastday[1].day.maxtemp_f

            document.getElementById('date3').innerText = formattedDateArray[2]
            document.getElementById('weatherImg3').src = image3
            document.getElementById('condition3').innerText = result.forecast.forecastday[2].day.condition.text
            document.getElementById('tempF3').innerText = result.forecast.forecastday[2].day.maxtemp_f

        })
}

function milliesToMinutesAndSeconds( millies ) {
    var seconds = Math.floor((millies / 1000) % 60)
    var minutes = Math.floor((millies / (1000 * 60)) % 60)
    var hours = Math.floor((millies / (1000 * 60 * 60)) % 24)
    
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds
}

function calcDuration() {
    const start = document.getElementById('keepStart').innerText
    const now = Date.now()
    const duration = now - Date.parse(start);
    const element = document.getElementById('durationElement')
    element.innerText = `Duration: ${milliesToMinutesAndSeconds(duration)}`
}

const keepDetermine = document.getElementById('keepStart')

if (keepDetermine) {
    setInterval(calcDuration, 1000)
}

async function endKeep(){
    const keepID = document.getElementById('keepID').innerText
    const stationID = document.getElementById('stationID').innerText
    var durationArray = document.getElementById('durationElement').innerText.split(' ')
    var durationElement = durationArray[1]
    console.log(durationArray)
    try{
        const response = await fetch('/dashboard/end-keep', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'ObjectId': `${keepID}`,
                'StationID': `${stationID}`,
                'DurationTime': `${durationElement}`
            })
        })
        const data = await response.text()
        window.location.href = "/dashboard";
    }catch(err){
        console.log(err)
    }
}
