<?php
include 'partials/header.php';
require 'config/database.php';

// --- BLOK KODE BARU UNTUK MENGAMBIL DATA TEKNOLOGI ---
$tech_map_query = mysqli_query($conn, "SELECT slug, name, icon_url FROM technologies");
$tech_map = [];
while ($row = mysqli_fetch_assoc($tech_map_query)) {
    $tech_map[$row['slug']] = $row; // Buat Peta/Map ikon berdasarkan slug
}
// --- AKHIR DARI BLOK KODE BARU ---


// --- LOGIKA PENGAMBILAN DATA PROYEK (tetap sama) ---
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$project = null;
$gallery_images = []; // Array kosong untuk menampung gambar galeri

if ($id > 0) {
    // 1. Ambil data proyek utama dari tabel `projects`
    $stmt = $conn->prepare("SELECT * FROM projects WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $project = $result->fetch_assoc();

        // 2. Jika proyek ditemukan, ambil gambar galerinya dari tabel `project_images`
        $stmt_gallery = $conn->prepare("SELECT image_path FROM project_images WHERE project_id = ?");
        $stmt_gallery->bind_param("i", $id);
        $stmt_gallery->execute();
        $result_gallery = $stmt_gallery->get_result();
        while($row = $result_gallery->fetch_assoc()) {
            $gallery_images[] = $row['image_path'];
        }
        $stmt_gallery->close();
    }
    $stmt->close();
}
$conn->close();
?>

<section id="project-detail" class="py-24 pt-32">
    <div class="container mx-auto px-4">

        <?php if ($project): // Jika data proyek ditemukan, tampilkan ini ?>
            
            <div class="max-w-5xl mx-auto">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <h1 class="text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-0">
                        <?php echo htmlspecialchars($project['title']); ?>
                    </h1>
                    <a href="/web-portofolio-rangga-rafandi/#projects" class="btn-secondary whitespace-nowrap">
                        &larr; Semua Proyek
                    </a>
                </div>

                <div class="card-stroke p-0 overflow-hidden">
                    <img src="/web-portofolio-rangga-rafandi/assets/images/<?php echo htmlspecialchars($project['image_url']); ?>" alt="Gambar Proyek <?php echo htmlspecialchars($project['title']); ?>" class="w-full h-auto md:h-[500px] object-cover">

                    <div class="p-8 md:p-12">
                        <div class="prose prose-invert prose-lg max-w-none text-muted leading-relaxed mb-8">
                            <p><?php echo nl2br(htmlspecialchars($project['description'])); ?></p>
                        </div>
                        
                        <div class="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 class="text-lg font-semibold text-white mb-3">Teknologi yang Digunakan:</h4>
                                <div class="flex flex-wrap gap-3">
                                <?php
                                $tech_stack = explode(',', $project['tech_stack'] ?? '');
                                foreach ($tech_stack as $tech_slug):
                                    $tech_slug = trim($tech_slug);
                                    if (array_key_exists($tech_slug, $tech_map)):
                                        $tech_data = $tech_map[$tech_slug];
                                ?>
                                    <div class="tech-icon">
                                        <img src="<?php echo htmlspecialchars($tech_data['icon_url']); ?>" alt="<?php echo htmlspecialchars($tech_data['name']); ?>">
                                        <span><?php echo htmlspecialchars($tech_data['name']); ?></span>
                                    </div>
                                <?php 
                                    endif;
                                endforeach; 
                                ?>
                                </div>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-white mb-3">Tautan Proyek:</h4>
                                <div class="flex flex-wrap items-center gap-4">
                                    <?php if (!empty($project['project_link']) && $project['project_link'] != '#'): ?>
                                        <a href="<?php echo htmlspecialchars($project['project_link']); ?>" target="_blank" class="btn">Lihat Live Demo</a>
                                    <?php endif; ?>
                                    <?php if (!empty($project['github_link'])): ?>
                                        <a href="<?php echo htmlspecialchars($project['github_link']); ?>" target="_blank" class="btn-secondary">Lihat di GitHub</a>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <?php if (!empty($gallery_images)): ?>
                <div class="mt-16">
                    <h2 class="text-3xl font-bold text-white mb-6 text-center">Galeri Proyek</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <?php foreach($gallery_images as $img): ?>
                            <div data-aos="fade-up">
                                <a href="/web-portofolio-rangga-rafandi/assets/images/<?php echo htmlspecialchars($img); ?>" target="_blank" class="block group">
                                    <div class="overflow-hidden rounded-lg border-2 border-slate-700/50 group-hover:border-primary/50 transition-all">
                                        <img src="/web-portofolio-rangga-rafandi/assets/images/<?php echo htmlspecialchars($img); ?>" alt="Galeri gambar" class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105">
                                    </div>
                                </a>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
                <?php endif; ?>

            </div>

        <?php else: // Jika data proyek TIDAK ditemukan ?>
            
            <div class="text-center text-white">
                <h1 class="text-4xl font-bold mb-4">404</h1>
                <p class="text-xl text-gray-400 mb-8">Oops! Proyek yang Anda cari tidak ditemukan.</p>
                <a href="/web-portofolio-rangga-rafandi/" class="btn">
                    Kembali ke Beranda
                </a>
            </div>

        <?php endif; ?>
        
    </div>
</section>

<?php
include 'partials/footer.php';
?>