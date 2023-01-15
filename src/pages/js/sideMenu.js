function closeSideNav(e) {
    if (e.target.classList[0] == "overlay") {
        Layer.closeCurrent();
    }
}

$("#layer-side-nav").onclick = closeSideNav;


