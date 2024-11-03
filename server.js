const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/data/:name', (req, res) => {
    const name = req.params.name;
    const dirPath = path.join(__dirname, 'data'); // Ścieżka do katalogu "data"

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Błąd podczas odczytu katalogu.' });
        }

        const projectFiles = files.filter(file => file.startsWith(`${name}_`) && file.endsWith('.json'));
        const projectsData = [];

        projectFiles.forEach((jsonFile) => {
            const projectName = jsonFile.replace('.json', ''); // Nazwa projektu (bez rozszerzenia)
            const jsonFilePath = path.join(dirPath, jsonFile);
            let projectData = {};

            try {
                const fileContent = fs.readFileSync(jsonFilePath, 'utf8');
                projectData = JSON.parse(fileContent);
            } catch (parseError) {
                console.error(`Błąd parsowania pliku ${jsonFile}:`, parseError);
            }

            const thumbnailFile = `${projectName}_thumbnail.png`;
            const thumbnailPath = path.join(dirPath, thumbnailFile);
            let thumbnailBase64 = null;

            if (files.includes(thumbnailFile)) {
                const thumbnailData = fs.readFileSync(thumbnailPath);
                thumbnailBase64 = `data:image/png;base64,${thumbnailData.toString('base64')}`;
            }

            const pngFiles = files
                .filter(file => file.startsWith(projectName) && file.endsWith('.png') && !file.includes('_thumbnail'))
                .map((file) => {
                    const filePath = path.join(dirPath, file);
                    const fileData = fs.readFileSync(filePath);
                    return {
                        fileName: file,
                        base64: `data:image/png;base64,${fileData.toString('base64')}`
                    };
                });

            projectsData.push({
                projectName,
                data: projectData,
                thumbnail: thumbnailBase64,
                pngFiles: pngFiles
            });
        });

        res.json({ projects: projectsData });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
