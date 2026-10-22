document.querySelector('.print-button').addEventListener('click', function () {
  var download = document.createElement('a');
  download.href = 'dist/ha-donggeon-adit-portfolio.pdf';
  download.download = '하동건 포트폴리오.pdf';
  document.body.appendChild(download);
  download.click();
  download.remove();
});
var topButton = document.querySelector('.back-to-top');
topButton.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); });
var progress = document.querySelector('.reading-progress');
var chapters = Array.from(document.querySelectorAll('.chapter'));
var links = Array.from(document.querySelectorAll('.site-header nav a'));
function updateReading() {
  var range = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (range > 0 ? window.scrollY / range * 100 : 0) + '%';
  topButton.classList.toggle('visible', window.scrollY > 650);
  var active = 'intro';
  var boundary = document.querySelector('.site-header').getBoundingClientRect().height + 90;
  chapters.forEach(function (chapter) { if (chapter.getBoundingClientRect().top <= boundary) active = chapter.id; });
  if (range > 0 && window.scrollY >= range - 2) active = chapters[chapters.length - 1].id;
  var group = ['analysis', 'reporting'].includes(active) ? 'marketing' : active;
  links.forEach(function (link) {
    var selected = link.getAttribute('href') === '#' + group;
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', updateReading, { passive: true });
window.addEventListener('resize', updateReading);
window.addEventListener('load', updateReading);
updateReading();
