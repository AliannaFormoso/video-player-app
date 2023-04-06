function checkAPIsupport() {
    if (window.File && window.FileReader && window.FileList) {
        document.getElementById('successAlert').classList.remove('d-none');
    } else {
        document.getElementById('warningAlert').classList.remove('d-none');
    }
}
window.onload = checkAPIsupport;

function handleFileSelect(evt) {
    let files = evt.target.files; // Fieldlist type object

    // Runs FileList and show video files
    for (let i = 0, f = 0;
        (f = files[i]); i++) {
        // If it is not a video file skip this loop time
        if (!f.type.match("video.*")) {
            continue;
        }

        // Runs the loop and insert videos in the page
        let reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                let span = document.createElement("span");
                span.innerHTML = [
                    '<video class="thumb" id="video" controls  src="',
                    e.target.result,
                    '" title="',
                    escape(theFile.name),
                    '"/>'
                ].join("");



                /*- Deletes previous div*/
                document.getElementById("opening").style.display = "none";

                // Shows video's details
                let videoDetails = document.getElementById("files").files[0];
                names = videoDetails.name
                sizes = videoDetails.size
                types = videoDetails.type
                dates = videoDetails.lastModifiedDate
                let text = '<strong>Name:</strong> ' + names + '<br>' + '<strong>Size:</strong> ' + sizes + '<br>' + '<strong>Type:</strong> ' + types + '<br>' + '<strong>Last Date Modified:</strong> ' + dates;

                document.getElementById('parvideoDetails').innerHTML = text

                // insertBefore Inserts a new element before the first secondary element and displays buttons
                setTimeout(function () {
                    document.getElementById("list").insertBefore(span, null);
                    document.getElementById("buttons").style.display = "flex";
                    document.getElementById("videoDetails").style.display = "block";
                }, 1500);
            };
        })(f);

        reader.readAsDataURL(f);
    }


    // Shows alerts on video uploading and after 1.5 secs it disappears 
    document.getElementById('iconAlert').classList.remove('d-none');
    setTimeout(function () {
        document.getElementById('iconAlert').remove()
    }, 1500);
}

document
    .getElementById("files")
    .addEventListener("change", handleFileSelect, false);