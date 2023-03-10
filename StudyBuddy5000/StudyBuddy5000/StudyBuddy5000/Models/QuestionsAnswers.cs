using System.ComponentModel.DataAnnotations;

namespace StudyBuddy5000.Models
{
  public class QuestionsAnswers
  {
    [Key]
    public int Id { get; set; }
    public string Question { get; set; }
    public string Answer { get; set; }
  }
}
