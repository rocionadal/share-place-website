// export async function getAddressFromCoords(coords) {
//   const urlAddress = encodeURI(address);
//   const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${urlAddress}.json?access_token=pk.eyJ1Ijoicm9jaW9uYWRhbCIsImEiOiJja211ZzVodzMwNHpqMm9rNWdpdm01dnliIn0.bpvbUZzOlSTxhPPSzoCuig`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch address. Please try again!');
//   }
//   const data = await response.json();
//   if (data.error_message) {
//     throw new Error(data.error_message);
//   }
//   console.log(data);
//   // console.log(address);

//   // const address = data.features[0];
//   // return address;

// }

export async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address);
  const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${urlAddress}.json?access_token=pk.eyJ1Ijoicm9jaW9uYWRhbCIsImEiOiJja211ZzVodzMwNHpqMm9rNWdpdm01dnliIn0.bpvbUZzOlSTxhPPSzoCuig`);
  if (!response.ok) {
    throw new Error('Failed to fetch coordinates. Please try again!');
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  console.log(data);

  const coordinates = data.features[0].center;
  return coordinates;
}