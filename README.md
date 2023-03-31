#Here, we've defined three endpoints: /video for uploading the video, /video/:filename for streaming the video, and /video/download/:filename for downloading the video.
<br>

## 1.    Handle the file upload: In the /video endpoint, we're using Multer to handle the file upload. We've set the dest option to 'uploads/', which means that the uploaded file will be saved to the uploads/ directory.
<br>
<br>
## 2.    Stream the video: In the /video/:filename endpoint, we're using the fs module to read the video file and stream it to the client. We're also using the range header to enable partial content requests (i.e. resumable downloads). If the client sends a range header, we'll send only the requested portion of the file. Otherwise, we'll send the entire file.
<br>
<br>
## 3.    Download the video: In the /video/download/:filename endpoint,
<br>
<br>
## 4. When making a request to the server to stream a video, you can include a "Range" header to specify which part of the video you want to receive. The "Range" header has the following format:
<br>
<br>
Range: bytes=start-end
<br>
<br>
Where start is the starting byte offset and end is the ending byte offset of the requested video segment. For example, to request the first 10 bytes of a video, you would send the following "Range" header:
<br>
<br>
Range: bytes=0-9
<br>
<br>
If you don't want to specify the ending byte offset, you can use the "-" character to indicate that you want to receive the rest of the video starting from the starting byte offset. For example, to request all bytes after the 10th byte, you would send the following "Range" header:
<br>
<br>
Range: bytes=10-
<br>
<br>
The server should then respond with the appropriate video segment(s) according to the specified byte offsets.
<br>
<br>
# POSTMAN ROUTES -
<br>
<br>
POST - http://localhost:3000/video
        - in form-data make a field name "video" with type "file"
<br>
<br>
GET - http://localhost:3000/video/{{file_name}}?range=bytes=0-9
<br>
<br>
GET - http://localhost:3000/video/{{file_name}}
<br>
<br>