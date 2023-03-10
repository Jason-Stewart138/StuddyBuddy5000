using System.ComponentModel.DataAnnotations;

namespace StudyBuddy5000.Models

{
  public class UserFavorite
  {
    [Key]
    public int Id { get; set; }
    public int UserDataId { get; set; }
    public virtual UserData UserData { get; set; }
    public int QuestionsAnswersId { get; set; }
    public virtual QuestionsAnswers QuestionsAnswers { get; set; }
  }
}
