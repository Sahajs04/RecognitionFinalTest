import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import { getDatabase, ref, get, child } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js';

// Your web app's Firebase configuration
const firebaseConfig = {
            apiKey: "AIzaSyDqF_g4kvf2hhJQ_SB_tP0f3rYVla-MIlA",
            authDomain: "recognition-52d3a.firebaseapp.com",
            databaseURL: "https://recognition-52d3a-default-rtdb.firebaseio.com",
            projectId: "recognition-52d3a",
            storageBucket: "recognition-52d3a.appspot.com",
            messagingSenderId: "844156316363",
            appId: "1:844156316363:web:75dc9cf291aaac8537494e"
        };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function fetchNamesAndImages() {
    const dbRef = ref(db, 'Recognition Pictures');
    const snapshot = await get(dbRef);
    const data = snapshot.val();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const entry = data[key];
            nameToImageMap[entry.Name] = `data:image/png;base64,${entry.Base64}`;
        }
    }
    // Log the nameToImageMap to see if it's being populated
    console.log('nameToImageMap:', nameToImageMap);
}

const requiredColumns = ['ID', 'Please describe why they deserve recognition', 'Your name', 'Who are you recognizing?'];
let nameToImageMap = {};
const personIcon = 'data:image/png;base64,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'
; // Replace with your base64 person icon

document.getElementById('fileInput').addEventListener('change', handleFile, false);

async function handleFile(e) {
    await fetchNamesAndImages();
    const files = e.target.files;
    if (!files.length) {
        showWarning('Please select an Excel file.');
        return;
    }
    const file = files[0];
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        showWarning('Please select a valid Excel file.');
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            console.log('First sheet name:', firstSheetName);
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            if (!validateColumns(jsonData[0])) {
                showWarning('The Excel file does not have the required columns.');
                return;
            }
            hideWarning();
            generateRecognitionItems(jsonData);
        } catch (error) {
            console.error('Error reading the Excel file:', error);
            showWarning('Error reading the Excel file. Please ensure it is a valid Excel file.');
        }
    };
    reader.readAsArrayBuffer(file);
}

function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function validateColumns(columns) {
    const cleanedColumns = columns.map(col => col.replace(/[\n\r]/g, ''));
    const missingColumns = requiredColumns.filter(col => !cleanedColumns.includes(col));
    if (missingColumns.length > 0) {
        console.error('Missing columns:', missingColumns);
        return false;
    }
    return true;
}

function showWarning(message) {
    const warningMessage = document.getElementById('warningMessage');
    warningMessage.innerText = message;
    warningMessage.style.display = 'block';
}

function hideWarning() {
    const warningMessage = document.getElementById('warningMessage');
    warningMessage.style.display = 'none';
}

function generateRecognitionItems(data) {
    const recognitionContainer = document.getElementById('recognitionContainer');
    recognitionContainer.innerHTML = '';
    const headers = data[0].map(header => header.trim());
    console.log('Headers:', headers);
    const rows = data.slice(1);
    rows.forEach((row, index) => {
        try {
            const id = row[headers.indexOf('ID')];
            const recognitionText = row[headers.indexOf('Please describe why they deserve recognition')];
            const recognizerName = row[headers.indexOf('Your name')];
            const recognizedNamesCell = row[headers.indexOf('Who are you recognizing?')];
            const additionalNamesCell = row[headers.indexOf('If not on the list, please write their name(s) here')];
            const recognizedNames = recognizedNamesCell ? recognizedNamesCell.split(';').map(name => name.trim()).filter(name => name && name !== 'Other') : [];
            const additionalNames = additionalNamesCell ? additionalNamesCell.split(';').map(name => name.trim()).filter(name => name) : [];
            console.log(`Row ${index + 1} - ID: ${id}, Recognizer: ${recognizerName}, Recognition Text: ${recognitionText}`);
            console.log(`Row ${index + 1} - Recognized Names: ${recognizedNames}, Additional Names: ${additionalNames}`);
            const recognitionItem = document.createElement('div');
            recognitionItem.className = 'recognition-item';
            const imageContainer = document.createElement('div');
            imageContainer.className = 'recognition-images';
            const namesContainer = document.createElement('div');
            namesContainer.className = 'recognition-names';
            namesContainer.innerText = recognizedNames.concat(additionalNames).join(', ');
            recognizedNames.forEach(name => {
                if (nameToImageMap[name]) {
                    const img = document.createElement('img');
                    img.src = `${nameToImageMap[name]}`;
                    imageContainer.appendChild(img);
                }
            });
            additionalNames.forEach(name => {
                const img = document.createElement('img');
                img.src = personIcon;
                imageContainer.appendChild(img);
            });
            recognitionItem.appendChild(imageContainer);
            recognitionItem.appendChild(namesContainer);
            const textDiv = document.createElement('div');
            textDiv.className = 'recognition-text';
            textDiv.innerText = `${recognitionText}\n~ ${recognizerName}`;
            recognitionItem.appendChild(textDiv);
            recognitionContainer.appendChild(recognitionItem);
            console.log(`Processed row ${index + 1} successfully`);
        } catch (error) {
            console.error(`Error processing row ${index + 1}:`, error);
        }
    });
}

window.onclick = function(event) {
    if (!event.target.matches('.menu-icon')) {
        const dropdowns = document.getElementsByClassName("dropdown-menu");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
}
