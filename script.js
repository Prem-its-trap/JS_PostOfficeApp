const currentIp = localStorage.getItem("currentIp");
let latitute;
let longitude;
let pincode;

function getUserIPDetails() {
  const latt = document.getElementById("lat");
  const long = document.getElementById("long");
  const org = document.getElementById("org");
  const region = document.getElementById("region");
  const hostname = document.getElementById("hostname");
  const city = document.getElementById("city");
  const ipp = document.getElementById("idadd");

  const timezone = document.getElementById("timezone");
  const dandt = document.getElementById("date&time");
  const pinc = document.getElementById("pincode");

  const getIpDetails = `https://ipinfo.io/${currentIp}?token=30dd7efacbc702`;
  fetch(getIpDetails)
    .then((res) => res.json())
    .then((d) => {
      //   console.log(d);
      const a = d.org;
      const b = a.slice(8, 16);
      const lalong = d.loc;
      latitute = lalong.split(",")[0];
      longitude = lalong.split(",")[1];
      pincode = d.postal;
      ipp.innerHTML = d.ip;
      latt.innerHTML += latitute;
      long.innerHTML += longitude;
      org.innerHTML += b;
      pinc.innerHTML = d.postal;
      region.innerHTML += d.region;
      city.innerHTML += d.city;
      hostname.innerHTML += d.postal;
      updateMap();
      getNumberofPinCode();
    });
  dandt.innerHTML = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
}
getUserIPDetails();

function updateMap() {
  const map = document.getElementsByTagName("iframe")[0];
  map.src = `https://maps.google.com/maps?q=${latitute}, ${longitude}&x=15&output=embed`;
}

function getNumberofPinCode() {
  const msg = document.getElementById("message");
  const pinapi = `https://api.postalpincode.in/pincode/${pincode}`;
  fetch(pinapi)
    .then((res) => res.json())
    .then((data) => {
      const { PostOffice } = data[0];
      console.log(PostOffice);
      msg.innerHTML += data[0].Message;
      const cards = document.getElementById("cards");
      const crd = document.createElement("div");
      console.log(crd);
      PostOffice.map((value) => {
        crd.innerHTML = `<div class="cardd">
            <h4>${value.Name}</h4>
            <h4>${value.BranchType}</h4>
            <h4>${value.DeliveryStatus}</h4>
            <h4>${value.District}</h4>
            <h4>${value.Division}</h4>
          </div>`;
      });
      cards.append(crd);
    });
}
