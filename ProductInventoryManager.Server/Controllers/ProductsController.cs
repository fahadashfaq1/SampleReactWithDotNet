using Microsoft.AspNetCore.Mvc;
using ProductInventoryManager.Server.Models;
using System;

namespace ProductInventoryManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ILogger<ProductsController> _logger;
        private readonly AppDbContext _dbContext;
        public ProductsController(ILogger<ProductsController> logger, AppDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }
        [HttpGet(Name = "GetAllProducts")]
        public IActionResult Get()
        {
            try
            {
                var products = _dbContext.Products.ToList();
                return Ok(products);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occurred in Get(). Exception Details: {ex?.ToString()}");
                return BadRequest("Couldn't get products list");
            } 
        }
        [HttpGet("{productCode}", Name = "GetProductByCode")]
        public IActionResult Get(string productCode)
        {
            try
            {
                var product = _dbContext.Products.FirstOrDefault(x => x.ProductCode == productCode);
                if (product == null)
                {
                    return NotFound("The product record couldn't be found.");
                }
                return Ok(product);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occurred in Get(). Exception Details: {ex?.ToString()}");
                return BadRequest("Couldn't get products");
            }
        }
        [HttpPost]
        public IActionResult CreateProduct([FromBody] ProductDTO product)
        {
            try
            {
                if (product == null)
                {
                    return NotFound("The Product record couldn't be found.");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                Models.Product productObj = new Models.Product();
                productObj.ProductCode = product.ProductCode;
                productObj.ProdName = product.ProdName;
                productObj.Price = product.Price;
                productObj.Quantity = product.Quantity;

                _dbContext.Products.Add(productObj);
                _dbContext.SaveChanges();
                return CreatedAtAction(nameof(Get), new { productCode = productObj.ProductCode }, productObj);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occurred in CreateProduct(). Exception Details: {ex?.ToString()}");
                return BadRequest("Couldn't update product");
            }

        }

        [HttpDelete("{productID}")]
        public IActionResult DeleteProduct(int productID)
        {
            try
            {
                var product = _dbContext.Products.FirstOrDefault(p => p.ProductID == productID);

                if (product == null)
                {
                    return NotFound($"Product with ID={productID} not found.");
                }
                _dbContext.Products.Remove(product);
                _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occurred in DeleteProduct(). Exception Details: {ex?.ToString()}");
                return BadRequest("Couldn't update product");
            }
            return Ok("The product is deleted successfully !");
        }

        [HttpPut("{productID}")]
        public IActionResult UpdateProduct(int productID, [FromBody] ProductDTO updatedProduct)
        {
            try
            {
                var existingProduct = _dbContext.Products.FirstOrDefault(p => p.ProductID == productID);
                if (existingProduct == null)
                {
                    return NotFound($"Product with ID={productID} not found.");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                existingProduct.ProdName = updatedProduct.ProdName;
                existingProduct.Quantity = updatedProduct.Quantity;
                existingProduct.Price = updatedProduct.Price;
                existingProduct.ProductCode = updatedProduct.ProductCode;

                _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occurred in UpdateProduct(). Exception Details: {ex?.ToString()}");
                return BadRequest("Couldn't update product");
            }
            return Ok("Product updated successfully !");
        }
    }
}
