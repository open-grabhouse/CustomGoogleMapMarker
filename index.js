function CustomMarker(latlng, map, args) {
    this.latlng = latlng;
    this.args = args;
    this.setMap(map);
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {

    var self = this;

    var div = this.div;

    if (!div) {

        div = this.div = document.createElement('div');

        div.innerHTML = '<div class="marker-wrap"><div class="marker-inner"><img class="img-marker-' + this.args.marker_id +'" style="display:' + this.args.imgStyle + ';" alt="" src="' + this.args.type + '" />' +
        '<div class="marker-content">' +
        '<img class="listImg" src="" data-src=\"'+this.args.photo_url+ '\" width="80" height="60" />'+
        '<div class="marker-details">' +
        '<div class="marker-head">'+this.args.title+ '</div>' +
        '<div class="marker-rent"><span>Rs. ' + this.args.rent +'</span> per month</div>'+
        '<div class="hr-line"></div>'+
        '<div class="marker-address">'+this.args.location+'</div></div></div></div></div>';

        div.className = 'marker marker-' + this.args.marker_id;

        //if (typeof(self.args.marker_id) !== 'undefined') {
        //    div.dataset.marker_id = self.args.marker_id;
        //}

        div.addEventListener("mousedown", this.clickfunc);
        div.addEventListener("mouseout", this.mouseoutfunc);
        div.addEventListener("mouseover", this.hoverfunc);

        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }

    var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

    if (point) {
        div.style.left = (point.x - 10) + 'px';
        div.style.top = (point.y - 20) + 'px';
    }
};

CustomMarker.prototype.remove = function() {
    if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    }
};

CustomMarker.prototype.getPosition = function() {
    return this.latlng;
};