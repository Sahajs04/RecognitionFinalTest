// Import the Supabase client library from a CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Create a single supabase client for interacting with your database
const supabase = createClient('https://vrszetgxfqizfjbrtscw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyc3pldGd4ZnFpemZqYnJ0c2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0MzM3NTksImV4cCI6MjAzODAwOTc1OX0.LSbGcs2UieCXM_pPoXiDLC_gBXxyno7W-8q85mRBDh8');

const requiredColumns = ['ID', 'Please describe why they deserve recognition', 'Your name', 'Who are you recognizing?'];
let nameToImageMap = {};
const personIcon = 'data:image/png;base64,YOUR_BASE64_IMAGE_HERE'; // Replace with your base64 person icon

document.getElementById('fileInput').addEventListener('change', handleFile, false);

async function fetchNamesAndImages() {
    try {
        const { data, error } = await supabase
            .from('Recognition Pictures') // replace with your table name
            .select('Name, Base64');
        
        if (error) {
            console.error('Error fetching data from Supabase:', error);
            return;
        }
        
        data.forEach(row => {
            nameToImageMap[row.name] = `data:image/png;base64,${row.image_base64}`;
        });
    } catch (error) {
        console.error('Unexpected error fetching names and images:', error);
    }
}

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
    // Add your file handling logic here
}

function showWarning(message) {
    const warningMessage = document.getElementById('warningMessage');
    warningMessage.textContent = message;
    warningMessage.style.display = 'block';
}