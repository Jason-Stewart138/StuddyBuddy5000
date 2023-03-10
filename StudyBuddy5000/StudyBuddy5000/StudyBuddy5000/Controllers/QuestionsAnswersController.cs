using Microsoft.AspNetCore.Mvc;
using StudyBuddy5000.DAL;
using StudyBuddy5000.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StudyBuddy5000.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class QuestionsAnswersController : ControllerBase
  {
    private ApplicationDbContext _db;
    public QuestionsAnswersController()
    {
      _db = new ApplicationDbContext();
    }
    [HttpGet]
    public IEnumerable<QuestionsAnswers> Get()
    {
      return _db.GetAllQuestionsAndAnswers();
    }


    [HttpGet("GetQuestionAnswerById/{id}")]
    public QuestionsAnswers Get(int id)
    {
      return _db.GetQuestionAnswerByID(id);
    }


    [HttpPost("AddQuestionAnswer/{question}/{answer}")]
    public QuestionsAnswers Post(string question, string answer)
    {
      return _db.AddQuestionAnswer(question, answer);
    }

    [HttpPost("DeleteQuestionAnswer/{questionAnswerId}")]
    public QuestionsAnswers DeleteQuestionAnswer(int questionAnswerId)
    {
      return _db.RemoveQuestionAnswer(questionAnswerId);
    }

    [HttpPost("RemoveUserFavorite/{questionAnswerId}/{userId}")]
    public void Delete(int questionAnswerId, int userId)
    {
      _db.DeleteUserFavoriteById(userId, questionAnswerId);
    }
    [HttpGet("GetAllUserFavorites/{userId}")]
    public IEnumerable<QuestionsAnswers> GetAllUserFavorites(int userId)
    {

      return _db.GetAllFavorites(userId);

    }

  }
}
