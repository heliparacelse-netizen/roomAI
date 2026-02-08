class Viewer3D {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#f5f7fb');

    this.camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    this.camera.position.set(8, 6, 10);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.maxPolarAngle = Math.PI / 2.1;

    this.autoRotate = true;
    this.controls.autoRotate = this.autoRotate;

    this.addLights();
    this.addBaseScene();

    window.addEventListener('resize', () => this.onResize());
    this.animate();
  }

  addLights() {
    this.ambient = new THREE.AmbientLight('#ffffff', 0.8);
    this.scene.add(this.ambient);

    this.directional = new THREE.DirectionalLight('#ffffff', 0.9);
    this.directional.position.set(6, 10, 4);
    this.scene.add(this.directional);
  }

  addBaseScene() {
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: '#e8ecf4' });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    this.scene.add(floor);

    const wallMaterial = new THREE.MeshStandardMaterial({ color: '#fefefe', side: THREE.DoubleSide });
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), wallMaterial);
    backWall.position.set(0, 5, -10);
    this.scene.add(backWall);
  }

  updateLighting(intensity) {
    this.ambient.intensity = intensity;
    this.directional.intensity = intensity;
  }

  updateZoom(distance) {
    this.camera.position.setLength(distance / 5);
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    this.controls.autoRotate = this.autoRotate;
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  addAssets(assets) {
    this.scene.traverse((child) => {
      if (child.userData && child.userData.asset) {
        this.scene.remove(child);
      }
    });

    assets.forEach((asset, index) => {
      const geometry = new THREE.BoxGeometry(1.2, 0.6, 0.8);
      const material = new THREE.MeshStandardMaterial({ color: asset.color || '#cbd5f5' });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(-4 + index * 2, 0.4, -2 + (index % 2) * 2);
      mesh.userData.asset = true;
      this.scene.add(mesh);
    });
  }

  exportImage() {
    return this.renderer.domElement.toDataURL('image/png');
  }

  onResize() {
    const { clientWidth, clientHeight } = this.container;
    this.camera.aspect = clientWidth / clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(clientWidth, clientHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

window.Viewer3D = Viewer3D;
