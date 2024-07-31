import { createClient } from "../node-modules/@supabase/supabase-js";
const supabaseUrl = 'https://vrszetgxfqizfjbrtscw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

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
