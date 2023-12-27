using System.ComponentModel.DataAnnotations;

namespace ProductInventoryManager.Server
{
    public class ProductDTO
    {
        [Key]
        public int ProductID { get; set; }
        [Required]
        [StringLength(30)]
        public string ProductCode { get; set; }

        [Required]
        [StringLength(50)]
        public string ProdName { get; set; }

        [Required]
        [Range(1, 1000, ErrorMessage = "Quantity must be between 1 - 1000")]
        public int Quantity { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public decimal Price { get; set; }
    }
}
