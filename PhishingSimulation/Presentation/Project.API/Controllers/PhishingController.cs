using Microsoft.AspNetCore.Mvc;
using Project.Core.Models;
using Project.Service.Services.Abstraction;

namespace Project.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhishingController : ControllerBase
    {
        private readonly IPhishingService _phishingService;

        public PhishingController(IPhishingService phishingService)
        {
            _phishingService = phishingService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendPhishingEmail([FromBody] PhishingRequest request)
        {
            return Ok(await _phishingService.SendPhishingEmail(request));
        }

        [HttpGet("click/{attemptId}")]
        public async Task<IActionResult> RegisterClick(string attemptId)
        {
            return Ok(await _phishingService.RegisterClick(attemptId));
        }
    }
}
