import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // White background

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// Camera setup - position it to view the cylinder from a good angle
// Position camera to view the center of the scene
camera.position.set(0, 0, 0);
camera.lookAt(0, 10, 50); // Look at the center of the scene (where cylinder is)

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.getElementById('app').appendChild(renderer.domElement);

// Controls - ensure they're centered on the scene
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 0;
controls.maxDistance = 30;
controls.target.set(0, 0, 0); // Set target to center of scene (where cylinder is)
controls.update(); // Update controls to apply target immediately

// Lighting - increased for brighter images
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
// directionalLight.position.set(10, 20, 5);
// directionalLight.castShadow = true;
// scene.add(directionalLight);

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0x000000); // light, size
// scene.add(directionalLightHelper);


// // Add additional light from the opposite side for better illumination
// const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
// directionalLight2.position.set(-10, 20, -5);
// scene.add(directionalLight2);

// const directionalLight2Helper = new THREE.DirectionalLightHelper(directionalLight2, 5, 0x000000);
// scene.add(directionalLight2Helper);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight3.position.set(22, 0, 0);
scene.add(directionalLight3);

// const directionalLight3Helper = new THREE.DirectionalLightHelper(directionalLight3, 5, 0x000000);
// scene.add(directionalLight3Helper);

const directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight4.position.set(-22, 0, 0);
scene.add(directionalLight4);

// const directionalLight4Helper = new THREE.DirectionalLightHelper(directionalLight4, 5, 0x000000);
// scene.add(directionalLight4Helper);

const directionalLight5 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight5.position.set(0, 0, 22);
scene.add(directionalLight5);

// const directionalLight5Helper = new THREE.DirectionalLightHelper(directionalLight5, 5, 0x000000);
// scene.add(directionalLight5Helper);

const directionalLight6 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight6.position.set(0, 0, -22);
scene.add(directionalLight6);

// const directionalLight6Helper = new THREE.DirectionalLightHelper(directionalLight6, 5, 0x000000);
// scene.add(directionalLight6Helper);

// Text configuration - Edit these to customize your text!
const textConfig = [
  "Love arrives quietly, often without warning. It slips into the small moments—sharing a meal, a look held a second too long, the soft relaxation of the shoulders when someone feels safe. It is gentle before it is grand. Love is not always fireworks. More often, it is the steady glow of embers. Something warm, something sustaining. It is the feeling of being understood without having to speak the full sentence. There are days when love feels easy, like breathing. And there are days when it asks for patience, for softness, for staying. Love is a practice, not just a feeling. Yet even when love is hard, it teaches us how deeply we can care. How much of ourselves we are capable of offering. And how beautiful it is to be met there.",
  "Love is the moment you realize someone sees you—really sees you. Not the version you polish, not the version you apologize for, but the honest, unguarded self beneath it all. To be known in this way is a small miracle. Love feels like opening a window in a room you forgot had been closed for years. The air is fresh. The dust shifts. Suddenly, everything you thought was still begins to move again.",
  "With love, time bends. Hours stretch into seconds, and days shrink into memories you carry in your pocket. You begin to measure your life not in days, but in moments of recognition.",
  "Love does not disappear when distance arrives. It stretches. It adapts. It speaks in new languages—long messages, midnight calls, the quiet act of staying present when presence is impossible.",
  "Love is not about staying the same. It is about becoming. It is about learning how to hold another person’s heart while also learning how to protect your own. Real love invites growth, even when growth requires discomfort. It asks, gently, “What kind of person are you becoming?” And it waits for the answer without judgment. Sometimes love means letting go of old versions of yourself—the guarded one, the fearful one, the one who believed they were hard to love. Love makes space for transformation. To love is to evolve. To be loved is to be seen as worthy of evolving.",
  "Not all love is loud. Some love whispers. It shows up in packed lunches, remembered preferences, “text me when you get home,” and playlists made just for you.",
  "Quiet love is slow and certain. It doesn’t need an audience. It builds a world quietly, room by room, around two people who choose each other again and again.",
  "In quiet love, safety becomes the foundation. You find yourself exhaling in ways you didn’t know you were holding in. Your heart unclenches. And in this softness, you realize that love doesn’t have to be extreme to be extraordinary.",
  "To love after heartbreak is an act of courage. It means believing again in something that once shattered you. It means reopening the door you once swore you’d keep locked forever.",
  "First love feels like discovering color for the first time. Everything is heightened—every glance, every brush of hands, every shared secret. The world feels impossibly wide and impossibly close.",
  "Love becomes teamwork. Two separate lives, still independent, but intertwined with intention and care. You learn to say “we” without losing “I.” This love does not demand, it understands. It stays because it wants to, not because it needs to."
];

// Category configuration - Edit these to customize your categories!
const categoryConfig = [
  "pattern design",
  "books you've read",
  "poetry about love"
];

// Seeded random number generator for consistent positioning
let seed = 12345; // Fixed seed for consistent positions
function seededRandom() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

// Cylinder parameters
const cylinderRadius = 10;
const cylinderHeight = 30;
const imageCount = 40;
const minAngleSeparation = (Math.PI * 2) / 15; // Minimum angle between images (about 24 degrees)
const minVerticalSeparation = 3.5; // Minimum vertical distance between images (increased for larger images)
const textMinVerticalSeparation = 2.0; // Minimum vertical distance for text

// Click interaction variables
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedObject = null;
let allClickableObjects = []; // Store all clickable objects (images + text)

// Load and place images
const textureLoader = new THREE.TextureLoader();
const images = [];
const placedPositions = []; // Store positions of placed images: {angle, y, height}
let loadedCount = 0;

// Function to check if a position overlaps with existing images or text
function checkOverlap(newAngle, newY, newHeight, isText = false) {
  const verticalSep = isText ? textMinVerticalSeparation : minVerticalSeparation;
  
  for (const placed of placedPositions) {
    // Check angular distance (handle wrap-around)
    let angleDiff = Math.abs(newAngle - placed.angle);
    if (angleDiff > Math.PI) {
      angleDiff = Math.PI * 2 - angleDiff;
    }
    
    // Check vertical distance
    const verticalDiff = Math.abs(newY - placed.y);
    const combinedHeight = (newHeight + placed.height) / 2;
    
    // If too close both angularly and vertically, it's an overlap
    if (angleDiff < minAngleSeparation && verticalDiff < combinedHeight + verticalSep) {
      return true;
    }
  }
  return false;
}

// Function to find a non-overlapping position
function findNonOverlappingPosition(planeHeight, maxAttempts = 100, isText = false) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const angle = seededRandom() * Math.PI * 2;
    const height = (seededRandom() - 0.5) * cylinderHeight;
    const radiusVariation = (seededRandom() - 0.5) * 1; // Reduced variation
    
    if (!checkOverlap(angle, height, planeHeight, isText)) {
      return { angle, height, radiusVariation };
    }
  }
  // If we can't find a good position after many attempts, use the last one anyway
  return {
    angle: seededRandom() * Math.PI * 2,
    height: (seededRandom() - 0.5) * cylinderHeight,
    radiusVariation: (seededRandom() - 0.5) * 1
  };
}

// Function to create a plane with an image
function createImagePlane(texture, index) {
  const aspectRatio = texture.image.width / texture.image.height;
  const planeWidth = 2 * 1.5; // 1.5x bigger
  const planeHeight = planeWidth / aspectRatio;
  
  const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
    emissive: 0x222222, // Add slight emissive glow to make images brighter
    emissiveIntensity: 0.3,
  });
  const plane = new THREE.Mesh(geometry, material);
  
  // Find a non-overlapping position
  const position = findNonOverlappingPosition(planeHeight);
  
  const x = Math.cos(position.angle) * (cylinderRadius + position.radiusVariation);
  const z = Math.sin(position.angle) * (cylinderRadius + position.radiusVariation);
  const y = position.height;
  
  plane.position.set(x, y, z);
  
  // Face outward from center while keeping upright
  // Calculate direction away from center
  const direction = new THREE.Vector3(x, 0, z).normalize();
  const outwardPoint = new THREE.Vector3(
    x + direction.x * 10,
    y,
    z + direction.z * 10
  );
  plane.lookAt(outwardPoint);
  
  // Store original position, scale, and rotation for animation
  plane.userData.originalPosition = plane.position.clone();
  plane.userData.originalScale = new THREE.Vector3(1, 1, 1);
  plane.userData.originalQuaternion = plane.quaternion.clone();
  plane.userData.isEnlarged = false;
  plane.userData.isText = false; // Mark as image, not text
  
  // Store this position to prevent future overlaps
  placedPositions.push({
    angle: position.angle,
    y: y,
    height: planeHeight
  });
  
  scene.add(plane);
  images.push(plane);
  allClickableObjects.push(plane);
}

// Load all images
for (let i = 1; i <= imageCount; i++) {
  textureLoader.load(
    `/Test image/${i}.jpg`,
    (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      createImagePlane(texture, i);
      loadedCount++;
      
      if (loadedCount === imageCount) {
        console.log('All images loaded!');
        // Ensure camera is centered after all objects are loaded
        camera.lookAt(0, 0, 0);
        controls.target.set(0, 0, 0);
        controls.update();
      }
    },
    undefined,
    (error) => {
      console.error(`Error loading image ${i}:`, error);
    }
  );
}

// Function to create text texture from string
function createTextTexture(text, width = 512, hasBackground = false) {
  // First pass: calculate required height
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  const tempContext = tempCanvas.getContext('2d');
  tempContext.font = 'regular 18px Arial';
  
  const lineHeight = 25;
  const padding = 170;
  const maxWidth = width - padding * 2;
  const words = text.split(' ');
  let currentLine = '';
  let lines = [];
  
  // Calculate how many lines we need
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine ? currentLine + ' ' + word : word;
    const metrics = tempContext.measureText(testLine);
    
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  
  // Calculate required height
  const requiredHeight = Math.max(512, lines.length * lineHeight + padding * 2);
  
  // Create actual canvas with proper height
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = requiredHeight;
  const context = canvas.getContext('2d');
  
  // Background (white or transparent)
  if (hasBackground) {
    context.fillStyle = 'transparent';
    context.fillRect(0, 0, width, requiredHeight);
  } else {
    context.clearRect(0, 0, width, requiredHeight);
  }
  
  // Black text
  context.fillStyle = '#000000';
  context.font = 'bold 24px Arial';
  
  // Calculate total text height for vertical centering
  const totalTextHeight = lines.length * lineHeight;
  
  // Center text vertically
  const startY = (requiredHeight - totalTextHeight) / 2 + lineHeight / 2;
  
  // Draw text lines (centered horizontally and vertically)
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  let y = startY;
  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], width / 2, y);
    y += lineHeight;
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// Function to create a text plane
function createTextPlane(text, index) {
  const texture = createTextTexture(text, 512, false); // Start with transparent background
  // Calculate aspect ratio from actual texture dimensions
  const textureAspectRatio = texture.image.width / texture.image.height;
  const planeWidth = 4;
  const planeHeight = planeWidth / textureAspectRatio;
  
  const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.95,
  });
  const plane = new THREE.Mesh(geometry, material);
  
  // Store the original text so we can recreate textures
  plane.userData.originalText = text;
  plane.userData.isText = true;
  
  // Find a non-overlapping position
  const position = findNonOverlappingPosition(planeHeight, 100, true);
  
  const x = Math.cos(position.angle) * (cylinderRadius + position.radiusVariation);
  const z = Math.sin(position.angle) * (cylinderRadius + position.radiusVariation);
  const y = position.height;
  
  plane.position.set(x, y, z);
  
  // Face outward from center while keeping upright
  // Calculate direction away from center
  const direction = new THREE.Vector3(x, 0, z).normalize();
  const outwardPoint = new THREE.Vector3(
    x + direction.x * 10,
    y,
    z + direction.z * 10
  );
  plane.lookAt(outwardPoint);
  
  // Store original position, scale, and rotation for animation
  plane.userData.originalPosition = plane.position.clone();
  plane.userData.originalScale = new THREE.Vector3(1, 1, 1);
  plane.userData.originalQuaternion = plane.quaternion.clone();
  plane.userData.isEnlarged = false;
  
  // Store this position to prevent future overlaps
  placedPositions.push({
    angle: position.angle,
    y: y,
    height: planeHeight
  });
  
  scene.add(plane);
  allClickableObjects.push(plane);
  return plane;
}

// Function to create category texture with dot
function createCategoryTexture(categoryText, width = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = 100; // Fixed height for categories
  const context = canvas.getContext('2d');
  
  // Transparent background
  context.clearRect(0, 0, width, 100);
  
  // Font settings
  const fontSize = 40;
  const dotSize = 50; // Dot is bigger than text (36px diameter vs 28px font)
  context.font = `bold ${fontSize}px Arial`;
  
  // Measure text width
  const textMetrics = context.measureText(categoryText);
  const textWidth = textMetrics.width;
  const spacing = 15; // Space between dot and text
  
  // Calculate total width and center position
  const totalWidth = dotSize + spacing + textWidth;
  const startX = (width - totalWidth) / 2;
  const centerY = 50; // Center vertically
  
  // Draw black dot (circle)
  context.fillStyle = '#000000';
  context.beginPath();
  context.arc(startX + dotSize / 2, centerY, dotSize / 2, 0, Math.PI * 2);
  context.fill();
  
  // Draw text
  context.fillStyle = '#000000';
  context.textAlign = 'left';
  context.textBaseline = 'middle';
  context.fillText(categoryText, startX + dotSize + spacing, centerY);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// Function to create a category plane
function createCategoryPlane(categoryText, index) {
  const texture = createCategoryTexture(categoryText);
  const textureAspectRatio = texture.image.width / texture.image.height;
  const planeWidth = 3;
  const planeHeight = planeWidth / textureAspectRatio;
  
  const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.95,
  });
  const plane = new THREE.Mesh(geometry, material);
  
  // Find a non-overlapping position
  const position = findNonOverlappingPosition(planeHeight, 100, true);
  
  const x = Math.cos(position.angle) * (cylinderRadius + position.radiusVariation);
  const z = Math.sin(position.angle) * (cylinderRadius + position.radiusVariation);
  const y = position.height;
  
  plane.position.set(x, y, z);
  
  // Face outward from center while keeping upright
  const direction = new THREE.Vector3(x, 0, z).normalize();
  const outwardPoint = new THREE.Vector3(
    x + direction.x * 10,
    y,
    z + direction.z * 10
  );
  plane.lookAt(outwardPoint);
  
  // Store original position, scale, and rotation for animation
  plane.userData.originalPosition = plane.position.clone();
  plane.userData.originalScale = new THREE.Vector3(1, 1, 1);
  plane.userData.originalQuaternion = plane.quaternion.clone();
  plane.userData.isEnlarged = false;
  plane.userData.isText = false; // Categories are not regular text
  plane.userData.isCategory = true; // Mark as category
  
  // Store this position to prevent future overlaps
  placedPositions.push({
    angle: position.angle,
    y: y,
    height: planeHeight
  });
  
  scene.add(plane);
  allClickableObjects.push(plane);
  return plane;
}

// Create text planes
const textPlanes = [];
textConfig.forEach((text, index) => {
  const textPlane = createTextPlane(text, index);
  textPlanes.push(textPlane);
});

// Create category planes
const categoryPlanes = [];
categoryConfig.forEach((category, index) => {
  const categoryPlane = createCategoryPlane(category, index);
  categoryPlanes.push(categoryPlane);
});

// Animation state
const animationState = {
  target: null,
  startScale: new THREE.Vector3(1, 1, 1),
  targetScale: new THREE.Vector3(1, 1, 1),
  startPosition: new THREE.Vector3(),
  targetPosition: new THREE.Vector3(),
  startQuaternion: new THREE.Quaternion(),
  targetQuaternion: new THREE.Quaternion(),
  progress: 0,
  duration: 500, // milliseconds
  startTime: 0,
  isAnimating: false
};

// Easing function for smooth animation
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Function to enlarge an object
function enlargeObject(object) {
  if (animationState.isAnimating) return;
  
  // If clicking the same object, close it
  if (selectedObject === object && object.userData.isEnlarged) {
    closeEnlarged();
    return;
  }
  
  // Close any previously selected object
  if (selectedObject && selectedObject !== object) {
    closeEnlarged();
  }
  
  selectedObject = object;
  object.userData.isEnlarged = true;
  
  // If it's text, switch to white background texture
  if (object.userData.isText && object.userData.originalText) {
    const whiteBgTexture = createTextTexture(object.userData.originalText, 512, true);
    object.material.map = whiteBgTexture;
    object.material.needsUpdate = true;
  }
  
  // Calculate position in front of camera
  const distanceFromCamera = 12; // Fixed distance in front of camera
  const cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);
  const enlargedPosition = camera.position.clone().add(cameraDirection.multiplyScalar(distanceFromCamera));
  
  // Calculate the scale needed to make object 70% of viewport height
  // Use both width and height to ensure it fits within 70% of screen
  const fovRad = (camera.fov * Math.PI) / 180;
  const visibleHeight = 2 * distanceFromCamera * Math.tan(fovRad / 2);
  const aspect = window.innerWidth / window.innerHeight;
  const visibleWidth = visibleHeight * aspect;
  
  // Target size is 70% of visible area
  const targetHeight = visibleHeight * 0.7;
  const targetWidth = visibleWidth * 0.7;
  
  // Get object's geometry bounding box (at scale 1) to determine its dimensions
  object.geometry.computeBoundingBox();
  const box = object.geometry.boundingBox;
  let objectHeight = (box.max.y - box.min.y) * object.scale.y;
  let objectWidth = (box.max.x - box.min.x) * object.scale.x;
  
  // Fallback if dimensions are invalid
  if (!objectHeight || objectHeight <= 0 || !isFinite(objectHeight)) {
    objectHeight = 2; // Default height
  }
  if (!objectWidth || objectWidth <= 0 || !isFinite(objectWidth)) {
    objectWidth = 2; // Default width
  }
  
  // Calculate scale needed to fit within 70% of screen (use the more restrictive dimension)
  const heightScale = targetHeight / objectHeight;
  const widthScale = targetWidth / objectWidth;
  const scaleFactor = Math.min(heightScale, widthScale); // Use smaller scale to ensure it fits
  const clampedScale = Math.max(0.1, Math.min(10, scaleFactor)); // Clamp scale factor
  const targetScale = new THREE.Vector3(clampedScale, clampedScale, clampedScale);
  
  // Calculate target rotation (facing camera) - use lookAt for simplicity
  const startQuat = object.quaternion.clone();
  
  // Use lookAt helper to get the correct rotation
  const tempObj = new THREE.Object3D();
  tempObj.position.copy(enlargedPosition);
  tempObj.lookAt(camera.position);
  const targetQuaternion = tempObj.quaternion.clone();
  
  // Ensure shortest rotation path (prevent flipping)
  if (startQuat.dot(targetQuaternion) < 0) {
    targetQuaternion.negate();
  }
  
  // Set up animation
  animationState.target = object;
  animationState.startScale.copy(object.scale);
  animationState.targetScale.copy(targetScale);
  animationState.startPosition.copy(object.position);
  animationState.targetPosition.copy(enlargedPosition);
  animationState.startQuaternion.copy(startQuat);
  animationState.targetQuaternion.copy(targetQuaternion);
  animationState.progress = 0;
  animationState.startTime = Date.now();
  animationState.isAnimating = true;
  
  // Disable controls while enlarged
  controls.enabled = false;
}

// Function to close enlarged object
function closeEnlarged() {
  if (!selectedObject) return;
  
  const objToClose = selectedObject;
  objToClose.userData.isEnlarged = false;
  
  // If it's text, switch back to transparent background texture
  if (objToClose.userData.isText && objToClose.userData.originalText) {
    const transparentTexture = createTextTexture(objToClose.userData.originalText, 512, false);
    objToClose.material.map = transparentTexture;
    objToClose.material.needsUpdate = true;
  }
  
  // Set up animation back to original
  animationState.target = objToClose;
  animationState.startScale.copy(objToClose.scale);
  animationState.targetScale.set(1, 1, 1);
  animationState.startPosition.copy(objToClose.position);
  animationState.targetPosition.copy(objToClose.userData.originalPosition);
  
  // Smoothly rotate back to original rotation
  const startQuat = objToClose.quaternion.clone();
  const targetQuat = objToClose.userData.originalQuaternion.clone();
  
  // Ensure shortest rotation path (prevent flipping)
  if (startQuat.dot(targetQuat) < 0) {
    targetQuat.negate();
  }
  
  animationState.startQuaternion.copy(startQuat);
  animationState.targetQuaternion.copy(targetQuat);
  animationState.progress = 0;
  animationState.startTime = Date.now();
  animationState.isAnimating = true;
  
  selectedObject = null;
  
  // Re-enable controls after animation completes
  setTimeout(() => {
    if (!selectedObject) {
      controls.enabled = true;
    }
  }, animationState.duration);
}

// Handle mouse click
function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(allClickableObjects);
  
  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    enlargeObject(clickedObject);
  } else if (selectedObject) {
    // Clicked on empty space, close enlarged object
    closeEnlarged();
  }
}

// Add click event listener
window.addEventListener('click', onMouseClick);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Handle animation
  if (animationState.isAnimating && animationState.target) {
    const elapsed = Date.now() - animationState.startTime;
    animationState.progress = Math.min(elapsed / animationState.duration, 1);
    
    const easedProgress = easeInOutCubic(animationState.progress);
    
    // Interpolate scale
    animationState.target.scale.lerpVectors(
      animationState.startScale,
      animationState.targetScale,
      easedProgress
    );
    
    // Interpolate position
    animationState.target.position.lerpVectors(
      animationState.startPosition,
      animationState.targetPosition,
      easedProgress
    );
    
    // Interpolate rotation using quaternion slerp (smooth rotation without flipping)
    const currentQuat = animationState.startQuaternion.clone();
    currentQuat.slerp(animationState.targetQuaternion, easedProgress);
    animationState.target.quaternion.copy(currentQuat);
    
    if (animationState.progress >= 1) {
      animationState.isAnimating = false;
    }
  }
  
  // Keep enlarged object facing camera if it's enlarged and not animating
  if (selectedObject && selectedObject.userData.isEnlarged && !animationState.isAnimating) {
    selectedObject.lookAt(camera.position);
  }
  
  controls.update();
  renderer.render(scene, camera);
}

// Function to recalculate enlarged object size to maintain 70% of screen
function recalculateEnlargedSize() {
  if (!selectedObject || !selectedObject.userData.isEnlarged || animationState.isAnimating) {
    return;
  }
  
  const distanceFromCamera = 12;
  const fovRad = (camera.fov * Math.PI) / 180;
  const visibleHeight = 2 * distanceFromCamera * Math.tan(fovRad / 2);
  const aspect = window.innerWidth / window.innerHeight;
  const visibleWidth = visibleHeight * aspect;
  
  const targetHeight = visibleHeight * 0.7;
  const targetWidth = visibleWidth * 0.7;
  
  selectedObject.geometry.computeBoundingBox();
  const box = selectedObject.geometry.boundingBox;
  let objectHeight = (box.max.y - box.min.y);
  let objectWidth = (box.max.x - box.min.x);
  
  if (!objectHeight || objectHeight <= 0 || !isFinite(objectHeight)) {
    objectHeight = 2;
  }
  if (!objectWidth || objectWidth <= 0 || !isFinite(objectWidth)) {
    objectWidth = 2;
  }
  
  const heightScale = targetHeight / objectHeight;
  const widthScale = targetWidth / objectWidth;
  const scaleFactor = Math.min(heightScale, widthScale);
  const clampedScale = Math.max(0.1, Math.min(10, scaleFactor));
  
  // Update scale smoothly
  selectedObject.scale.set(clampedScale, clampedScale, clampedScale);
}

// Handle window resize
function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // Update camera aspect ratio
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  
  // Update renderer size
  renderer.setSize(width, height);
  
  // Recalculate enlarged object size if one is currently enlarged
  recalculateEnlargedSize();
}

window.addEventListener('resize', handleResize);

// Function to reset camera view to center
function resetCameraView() {
  camera.position.set(0, 0, 40);
  camera.lookAt(0, 0, 0);
  controls.target.set(0, 0, 0);
  controls.update();
}

// Call once on initial load to ensure correct sizing and centering
handleResize();
resetCameraView();

// Reset view after a short delay to ensure everything is loaded
setTimeout(() => {
  resetCameraView();
}, 100);

animate();

