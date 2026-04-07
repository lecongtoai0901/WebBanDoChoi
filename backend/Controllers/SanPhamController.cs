using DoAn_WebBanDoChoi.DTOs.SanPham;
using DoAn_WebBanDoChoi.Services;
using DoAn_WebBanDoChoi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DoAn_WebBanDoChoi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SanPhamController : ControllerBase
    {
        private readonly ISanPhamService _service;
        private readonly CloudinaryService _cloudinaryService;

        public SanPhamController(ISanPhamService service, CloudinaryService cloudinaryService)
        {
            _service = service;
            _cloudinaryService = cloudinaryService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            Console.WriteLine($"[Upload] Request received. File: {file?.FileName}");
            
            if (file == null || file.Length == 0)
            {
                Console.WriteLine("[Upload] File is null or empty");
                return BadRequest("File không được để trống");
            }

            try
            {
                Console.WriteLine($"[Upload] Uploading file to Cloudinary: {file.FileName}, Size: {file.Length} bytes");
                
                var imageUrl = await _cloudinaryService.UploadImageAsync(file);
                
                Console.WriteLine($"[Upload] File uploaded successfully: {imageUrl}");
                return Ok(new { imageUrl, message = "Upload thành công" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[Upload] Error: {ex.Message}");
                return StatusCode(500, new { message = "Lỗi khi upload: " + ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateSanPhamDTO dto)
        {
            if (string.IsNullOrEmpty(dto.Tensp))
                return BadRequest("Tên sản phẩm không được để trống");

            var result = await _service.Create(dto);
            return Ok(new { message = "Thêm sản phẩm thành công", masp = result });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        [HttpGet("search/{keyword}")]
        public async Task<IActionResult> Search(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
                return BadRequest("Keyword không được để trống");
            var result = await _service.Search(keyword);
            return Ok(result);
        }

        [HttpGet("category/{categoryId:int}")]
        public async Task<IActionResult> GetByCategory(int categoryId)
        {
            var result = await _service.GetByCategory(categoryId);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetById(id);
            if (result == null)
                return NotFound("Sản phẩm không tồn tại");
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateSanPhamDTO dto)
        {
            if (string.IsNullOrEmpty(dto.Tensp))
                return BadRequest("Tên sản phẩm không được để trống");

            var result = await _service.Update(id, dto);
            if (!result)
                return NotFound("Sản phẩm không tồn tại");
            return Ok(new { message = "Cập nhật sản phẩm thành công" });
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.Delete(id);
            if (!result)
                return NotFound("Sản phẩm không tồn tại");
            return Ok(new { message = "Xóa sản phẩm thành công" });
        }
    }
}
