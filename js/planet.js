class planet {
  constructor(planetImg, radius, widthSegments, heightSegments) {
    this.planetImg = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(planetImg)
    });
    this.geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  }

  get Material() {
    return this.planetImg;
  }

  get Geometry() {
    return this.geometry;
  }
}

class ring {
  constructor(ringImg, ringRadius, thetaSegments, phiSegments, thetaLength) {
    this.ringImg = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(ringImg),
      opacity: 0.7,
      transparent: true
    });;
    this.ringGeometry = new THREE.TorusGeometry(ringRadius, thetaSegments, phiSegments, thetaLength);
  }

  get Material() {
    return this.ringImg;
  }

  get Geometry() {
    return this.ringGeometry;
  }
}

class crowd {
  constructor(croudImg, croudRdius, crowdWidthSegments, crowdHeightSegments) {
    this.croudImg = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(croudImg),
      transparent: true,
      side: THREE.DoubleSide
    });
    this.croudGeometry = new THREE.SphereGeometry(croudRdius, crowdWidthSegments, crowdHeightSegments);
  }

  get Material() {
    return this.croudImg;
  }

  get Geometry() {
    return this.croudGeometry;
  }
}
