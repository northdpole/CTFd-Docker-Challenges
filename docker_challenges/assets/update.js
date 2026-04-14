CTFd.plugin.run((_CTFd) => {
    const $ = _CTFd.lib.$
    const md = _CTFd.lib.markdown()
    $(document).ready(function() {
        // Always preserve current image so admins can save other fields
        // even if the image API is empty/misconfigured.
        if (typeof DOCKER_IMAGE !== "undefined" && DOCKER_IMAGE) {
            $("#dockerimage_select").append(
                $("<option />").val(DOCKER_IMAGE).text(DOCKER_IMAGE)
            );
            $("#dockerimage_select").val(DOCKER_IMAGE).change();
        }

        $.getJSON("/api/v1/docker", function(result) {
            const seen = new Set();
            $.each(result['data'], function(i, item) {
                if (!seen.has(item.name)) {
                    $("#dockerimage_select").append($("<option />").val(item.name).text(item.name));
                    seen.add(item.name);
                }
            });
            if (typeof DOCKER_IMAGE !== "undefined" && DOCKER_IMAGE) {
                $("#dockerimage_select").val(DOCKER_IMAGE).change();
            }
        });
    });
});