using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace DoAn_WebBanDoChoi.Services
{
    public class CloudinaryService
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryService(IConfiguration configuration)
        {
            var cloudName = configuration["Cloudinary:CloudName"] 
                ?? Environment.GetEnvironmentVariable("CLOUDINARY_CLOUDNAME");
            var apiKey = configuration["Cloudinary:ApiKey"] 
                ?? Environment.GetEnvironmentVariable("CLOUDINARY_APIKEY");
            var apiSecret = configuration["Cloudinary:ApiSecret"] 
                ?? Environment.GetEnvironmentVariable("CLOUDINARY_APISECRET");

            if (string.IsNullOrEmpty(cloudName) || string.IsNullOrEmpty(apiKey) || string.IsNullOrEmpty(apiSecret))
            {
                throw new InvalidOperationException("Cloudinary credentials not configured");
            }

            var account = new Account(cloudName, apiKey, apiSecret);
            _cloudinary = new Cloudinary(account);
        }

        public async Task<string> UploadImageAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File không được để trống");

            using (var stream = file.OpenReadStream())
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, stream),
                    Folder = "webbandochoi"
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.Error != null)
                    throw new Exception($"Upload failed: {uploadResult.Error.Message}");

                return uploadResult.SecureUrl.ToString();
            }
        }

        public async Task<bool> DeleteImageAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok";
        }
    }
}
