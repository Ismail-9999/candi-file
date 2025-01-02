<?php
// Paramètres de l'API (comme précédemment)
$apiUrl = 'https://i-team.ma/Iteam-dev/api/index.php/recruitment/jobposition';
$apiKey = '73bfd6c7ecfc9718513bd0682e24134a6f28eb1f';

$params = [
    'sortfield' => 't.rowid',
    'sortorder' => 'ASC',
    'limit' => 100,
    'DOLAPIKEY' => $apiKey
];

$url = $apiUrl . '?' . http_build_query($params);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if(curl_errno($ch)){
    echo 'Erreur cURL : ' . curl_error($ch);
}
 
curl_close($ch);

$jobs = json_decode($response, true);

$hasJobs = !empty($jobs) && is_array($jobs);

// Fonction pour obtenir les filtres uniques
function getUniqueFilters($jobs, $field) {
    $filters = array_unique(array_column($jobs, $field));
    return array_filter($filters);
}

$experienceFilters = getUniqueFilters($jobs, 'experience');
$typeFilters = getUniqueFilters($jobs, 'type');
$sectorFilters = getUniqueFilters($jobs, 'sector');
$cityFilters = getUniqueFilters($jobs, 'town');
$countryFilters = getUniqueFilters($jobs, 'country');
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rejoignez-nous - Postes à pourvoir actuels</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .filter-checkbox:checked + span {
            background-color: #4CAF50;
            color: white;
            padding: 2px 8px;
            border-radius: 9999px;
        }
    </style>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-2 text-center">Rejoignez-nous</h1>
        <h2 class="text-xl mb-6 text-center text-gray-600">Postes à pourvoir actuels</h2>

        <div class="flex">
            <!-- Filtres -->
            <div class="w-1/4 pr-4">
                <h3 class="font-bold mb-3">Filtres</h3>
                
                <div class="mb-4">
                    <h4 class="font-semibold mb-2">Expérience professionnelle</h4>
                    <?php foreach ($experienceFilters as $filter): ?>
                        <label class="flex items-center mb-2">
                            <input type="checkbox" class="filter-checkbox mr-2" value="<?php echo htmlspecialchars($filter); ?>" data-filter="experience">
                            <span class="text-sm"><?php echo htmlspecialchars($filter); ?></span>
                        </label>
                    <?php endforeach; ?>
                </div>

                <!-- Répétez pour les autres catégories de filtres -->
                
            </div>

            <!-- Liste des emplois -->
            <div class="w-3/4">
                <div class="flex mb-4">
                    <div class="w-1/2 pr-2">
                        <input type="text" id="jobSearch" placeholder="Titre d'emploi ou compétence" class="w-full p-2 border rounded">
                    </div>
                    <div class="w-1/2 pl-2">
                        <input type="text" id="locationSearch" placeholder="Ville, état/région ou pays" class="w-full p-2 border rounded">
                    </div>
                    <button id="searchButton" class="bg-green-700 text-white px-4 py-2 rounded ml-2">Rechercher</button>
                </div>

                <div id="jobListings">
                    <?php if ($hasJobs): ?>
                        <?php foreach ($jobs as $job): ?>
                            <div class="bg-white p-4 rounded shadow mb-4 job-item">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h2 class="text-xl font-semibold text-green-700"><?php echo htmlspecialchars($job['label']); ?></h2>
                                        <p class="text-gray-600"><?php echo htmlspecialchars($job['town'] . ', ' . $job['country']); ?></p>
                                        <p class="text-gray-600"><?php echo htmlspecialchars($job['experience']); ?></p>
                                    </div>
                                    <div class="text-right">
                                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"><?php echo htmlspecialchars($job['type']); ?></span>
                                        <p class="text-gray-600 mt-1"><?php echo date('d/m/Y', strtotime($job['date_creation'])); ?></p>
                                    </div>
                                </div>
                                <p class="mt-2"><?php echo substr(htmlspecialchars($job['description']), 0, 200) . '...'; ?></p>
                            </div>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <p>Aucune offre d'emploi disponible pour le moment.</p>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const jobItems = document.querySelectorAll('.job-item');
        const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
        const searchButton = document.getElementById('searchButton');
        const jobSearch = document.getElementById('jobSearch');
        const locationSearch = document.getElementById('locationSearch');

        function filterJobs() {
            const searchTerm = jobSearch.value.toLowerCase();
            const locationTerm = locationSearch.value.toLowerCase();
            const activeFilters = {};

            filterCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const filterType = checkbox.dataset.filter;
                    if (!activeFilters[filterType]) {
                        activeFilters[filterType] = [];
                    }
                    activeFilters[filterType].push(checkbox.value.toLowerCase());
                }
            });

            jobItems.forEach(job => {
                const jobTitle = job.querySelector('h2').textContent.toLowerCase();
                const jobLocation = job.querySelector('p').textContent.toLowerCase();
                let showJob = jobTitle.includes(searchTerm) && jobLocation.includes(locationTerm);

                if (showJob) {
                    for (let filterType in activeFilters) {
                        const jobValue = job.dataset[filterType].toLowerCase();
                        if (!activeFilters[filterType].includes(jobValue)) {
                            showJob = false;
                            break;
                        }
                    }
                }

                job.style.display = showJob ? 'block' : 'none';
            });
        }

        searchButton.addEventListener('click', filterJobs);
        filterCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterJobs));
    });
    </script>
</body>
</html>