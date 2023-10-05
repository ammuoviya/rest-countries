let obj=[];
let data = [];
fetch('https://restcountries.com/v2/all')
  .then((response) => response.json())
  .then((res) => {
    data = res;
    console.log(data)
    console.log(data.length);
   for(let i=0;i<data.length;i++)
   {
    let a={} 
     a['name']=data[i].name;
     a['capital']=data[i].capital;
     a['region']=data[i].region;
     a['flag']=data[i].flag;
     a['code']=data[i].alpha3Code;
     a['latlng']=data[i].latlng;
     obj.push(a);
   }
   display(obj);
   
  })
  .catch((error) => {
    console.error('Error fetching data: ', error);
  });

  function display(obj)
  {
    for(let i=0;i<obj.length;i++)
  {  
  const country = obj[i];
  const name = document.createElement("h2");
  name.textContent = country.name;
  const flag = document.createElement("img");
  flag.setAttribute("class","card-image")
  flag.src = country.flag;
  flag.setAttribute("alt","sorry")
  const capital=document.createElement("p");
  capital.textContent=country.capital;
  const region=document.createElement("p");
  region.textContent=country.region;
  const code=document.createElement("p");
  code.textContent=country.code;
  const latlng=country.latlng;
  
  const row=document.getElementById("row");
  const colDiv=document.createElement("div");
  colDiv.setAttribute("class","col-lg-4 col-sm-12");
  row.append(colDiv);
  const cardDiv=document.createElement("div");
  cardDiv.setAttribute("class","card");
  const cardHead=document.createElement("div");
  cardHead.setAttribute("class","card-header");
  cardHead.append(name);
  cardDiv.appendChild(cardHead);
  const imgDiv=document.createElement("div")
  imgDiv.setAttribute("class","imgDiv")
  imgDiv.appendChild(flag);
  cardDiv.appendChild(imgDiv);
  const cardBody=document.createElement("div");
  cardBody.setAttribute("class","card-body");
  const p1=document.createElement("p");
  p1.setAttribute("class","card-text")
  const tp1=document.createTextNode("Capital:")
  const space1=document.createTextNode(" ")
  p1.append(tp1,space1,capital.innerText);
  cardBody.append(p1);
  const p2=document.createElement("p");
  p2.setAttribute("class","card-text")
  const tp2=document.createTextNode("Region:")
  const space2=document.createTextNode(" ")
  p2.append(tp2,space2,region.innerText);
  cardBody.append(p2);
  const p3=document.createElement("p");
  p3.setAttribute("class","card-text")
  const tp3=document.createTextNode("Country Code:")
  const space3=document.createTextNode(" ")
  p3.append(tp3,space3,code.innerText);
  cardBody.append(p3);
  var popdiv=document.createElement("div");
  popdiv.setAttribute("id","popupbox")
  popdiv.innerHTML=`<h2>Weather Information</h2>
  <p id="p1"></p>
  <button onclick="hidePopup()" >Close</button>`
  document.body.append(popdiv)
  
  const btncard=document.createElement("button");
  btncard.setAttribute("class","btn btn-primary");
  btncard.setAttribute("type","button");
  btncard.innerText="Click for Weather"; 
  btncard.onclick=function()
  {
    myFunction(latlng)
    showPopup();
  }
  cardBody.append(btncard)
  cardDiv.appendChild(cardBody);
  colDiv.appendChild(cardDiv);
 }
}

function showPopup() {
  var popup = document.getElementById("popupbox");
  if (popup) {
    popup.style.display = "block";
  }
  else {
    console.error("Popup element not found");
  }
}

function hidePopup() {
  var popup = document.getElementById("popupbox");
  if (popup) {
    popup.style.display = "none";
  }
  else {
    console.error("Popup element not found");
  }
}

function myFunction(code1)
{
  let latitudeInput=code1[0];
  let longitudeInput=code1[1];
  console.log(latitudeInput,longitudeInput);
  getWeather(latitudeInput,longitudeInput);
}
function getWeather(lat,long){
  const latitude = lat;
  const longitude =long;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8058f39594374fc2f6966bcad02c65df`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const temperature = (data.main.temp-273.15).toFixed(3);
      const description = data.weather[0].description;
      const humidity=data.main.humidity;
      const result = document.getElementById('p1');
      result.innerHTML = `Temperature: ${temperature} &deg;C <br>Humidity:${humidity}&percnt;<br>
      Description: ${description}`;
    })
    .catch(error => console.log("Error",error));
}

