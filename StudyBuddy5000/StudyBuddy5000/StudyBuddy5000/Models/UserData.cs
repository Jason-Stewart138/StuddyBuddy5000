using System.ComponentModel.DataAnnotations;

namespace StudyBuddy5000.Models
{
  public class UserData
  {
    [Key]
    public int Id { get; set; }
    public string UserName { get; set; }
    public string UserPassword { get; set; }
  }
}
