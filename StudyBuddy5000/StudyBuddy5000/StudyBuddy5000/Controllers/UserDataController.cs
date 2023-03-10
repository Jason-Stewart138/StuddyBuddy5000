using Microsoft.AspNetCore.Mvc;
using StudyBuddy5000.Models;
using StudyBuddy5000.DAL;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StudyBuddy5000.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserDataController : ControllerBase
  {
    private ApplicationDbContext _db;
    public UserDataController()
    {
      _db = new ApplicationDbContext();
    }

    [HttpGet]
    public List<UserData> Get()
    {
      return _db.GetAllUsers();
    }

    [HttpGet("Login/{userName}/{password}")]
    public UserData GetUser(string userName, string password)
    {
      UserData user = _db.GetUser(userName);
      if (user == null || user.UserPassword != password)
      {
        return null;
      }
      return user;
    }

    [HttpPost("CreateLogin/{userName}/{password}")]
    public UserData Post(string userName, string password)
    {

      return _db.AddUser(userName, password);
    }

    [HttpPost("AddUserFavorite/{studyId}/{userId}")]
    public QuestionsAnswers PostUserFavorite(int studyId, int userId)
    {
      return _db.FavoriteQuestionAnswer(studyId, userId);

    }

    [HttpPost("DeleteUserFavorite/{studyId}/{userId}")]
    public bool DeleteUserFavorite(int userId, int studyId)
    {
      return _db.DeleteUserFavoriteById(userId, studyId);
    }

    [HttpPost("DeleteUser/{userId}")]
    public bool DeleteUser(int userId)
    {
      return _db.DeleteUser(userId);
    }
  }
}
