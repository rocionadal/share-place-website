import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress } from './Utility/Location';

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');
    this.sharedLinkInputElement = document.getElementById('share-link');


    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler.bind(this));
    addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
  }

  sharePlaceHandler() {
    if (!navigator.clipboard) {
      this.sharedLinkInputElement.select();
      return;
    }
    navigator.clipboard.writeText(this.sharedLinkInputElement.value)
    .then(() => {
      alert('Copied into clipboard!');
    })
    .catch(err => {
      console.log(err);
      this.sharedLinkInputElement.select();
    });
  }
  
  selectPlace(coordinates) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    this.shareBtn.disabled = false;
    this.sharedLinkInputElement.value = `${location.origin}/my-place?lat=${coordinates.lat}&lng=${coordinates.lng}`;
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert('Location feature is not available in your browser - please use a more modern browser or manually enter an address');
      return;
    }
    const modal = new Modal('loading-modal-content', 'Loading location - please wait!');
    modal.show();
    navigator.geolocation.getCurrentPosition(
      successResult => {
        modal.hide();
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude
        };
        this.selectPlace(coordinates);
      }, error => {
        modal.hide();
        alert('Could not locate you unfortunately. Please enter an address manually!');
      }
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector('input').value;
    if (!address || address.trim() === 0) {
      alert('Invalid address entered - please try again!');
      return;
    }
    const modal = new Modal('loading-modal-content', 'Loading location - please wait!');
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates);
    } catch (err) {
      alert(err.message);
    }
    modal.hide();
  }
}

new PlaceFinder();