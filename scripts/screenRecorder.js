//***************CODE FOR SCREENRECORDER******************/
let recStart = document.querySelector('.fa-desktop');
    let recStop = document.querySelector('.fa-stop');
    let recSave = document.querySelector('.fa-save');
    let recBtn = document.querySelector('[class="btn btn-info"]');
    let downloadRecBtn = document.querySelector('#download-rec');
    let stopBtn = document.querySelector('[class="btn btn-danger"]');
    // console.log(downloadBtn);
    

    recStart.addEventListener('click',function(){
        recBtn.click();
    });
    recStop.addEventListener('click',function(){
        stopBtn.click();
    });
    recSave.addEventListener('click',function(){
      downloadRecBtn.click();
      location.reload();
    });
    let shouldStop = false;
    let stopped = false;
    const videoElement = document.getElementsByTagName("video")[0];
    const downloadLink = document.getElementById('download-rec');
    const stopButton = document.getElementById('stop');
    function startRecord() {
        $('.btn-info').prop('disabled', true);
        $('#stop').prop('disabled', false);
        $('#download-rec').css('display', 'none')
    }
    function stopRecord() {
        $('.btn-info').prop('disabled', false);
        $('#stop').prop('disabled', true);
        $('#download-rec').css('display', 'block')
    }
    const audioRecordConstraints = {
        echoCancellation: true
    }

    stopButton.addEventListener('click', function () {
        shouldStop = true;
    });

    const handleRecord = function ({stream, mimeType}) {
        startRecord()
        let recordedChunks = [];
        stopped = false;
        let mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = function (e) {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }

            if (shouldStop === true && stopped === false) {
                mediaRecorder.stop();
                stopped = true;
            }
        };

        mediaRecorder.onstop = function () {
            const blob = new Blob(recordedChunks, {
                type: mimeType
            });
            recordedChunks = []
            const filename = window.prompt('Enter file name');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = `${filename || 'recording'}.webm`;
            stopRecord();
            videoElement.srcObject = null;
        };

        mediaRecorder.start(200);
    };

    async function recordAudio() {
        const mimeType = 'audio/webm';
        shouldStop = false;
        const stream = await navigator.mediaDevices.getUserMedia({audio: audioRecordConstraints});
        handleRecord({stream, mimeType})
    }

    async function recordVideo() {
        const mimeType = 'video/webm';
        shouldStop = false;
        const constraints = {
            audio: {
                "echoCancellation": true
            },
            video: {
                "width": {
                    "min": 640,
                    "max": 1024
                },
                "height": {
                    "min": 480,
                    "max": 768
                }
            }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = stream;
        handleRecord({stream, mimeType})
    }

    async function recordScreen() {
        const mimeType = 'video/webm';
        shouldStop = false;
        const constraints = {
            video: {
                cursor: 'motion'
            }
        };
        if(!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia)) {
            return window.alert('Screen Record not supported!')
        }
        let stream = null;
        const displayStream = await navigator.mediaDevices.getDisplayMedia({video: {cursor: "motion"}, audio: {'echoCancellation': true}});
        if(window.confirm("Record audio with screen?")){
            const voiceStream = await navigator.mediaDevices.getUserMedia({ audio: {'echoCancellation': true}, video: false });
            let tracks = [...displayStream.getTracks(), ...voiceStream.getAudioTracks()]
            stream = new MediaStream(tracks);
            handleRecord({stream, mimeType})
        } else {
            stream = displayStream;
            handleRecord({stream, mimeType});
        };
        videoElement.srcObject = stream;
    }
//********************************************************/