// Sistema simples de navegação livre (Fly Controls)
class FreeRoamCamera {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement;
        this.moveSpeed = 0.5;
        this.keys = {};

        this.isMouseDown = false;
        this.mouseX = 0;
        this.mouseY = 0;

        window.addEventListener('keydown', (e) => this.keys[e.key.toLowerCase()] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key.toLowerCase()] = false);

        domElement.addEventListener('mousedown', () => this.isMouseDown = true);
        domElement.addEventListener('mouseup', () => this.isMouseDown = false);
        domElement.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    onMouseMove(event) {
        if (!this.isMouseDown) return;
        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;

        this.camera.rotation.y -= movementX * 0.002;
        this.camera.rotation.x -= movementY * 0.002;
        this.camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.camera.rotation.x));
    }

    update() {
        const dir = new THREE.Vector3();
        this.camera.getWorldDirection(dir);
        const sideDir = new THREE.Vector3().crossVectors(this.camera.up, dir).normalize();

        if (this.keys['w']) this.camera.position.addScaledVector(dir, this.moveSpeed);
        if (this.keys['s']) this.camera.position.addScaledVector(dir, -this.moveSpeed);
        if (this.keys['a']) this.camera.position.addScaledVector(sideDir, this.moveSpeed);
        if (this.keys['d']) this.camera.position.addScaledVector(sideDir, -this.moveSpeed);
        if (this.keys['q']) this.camera.position.y += this.moveSpeed;
        if (this.keys['e']) this.camera.position.y -= this.moveSpeed;
    }
}
