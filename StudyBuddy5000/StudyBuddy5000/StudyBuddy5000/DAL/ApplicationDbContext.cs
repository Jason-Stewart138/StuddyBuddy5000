using Microsoft.EntityFrameworkCore;
using StudyBuddy5000.Models;

namespace StudyBuddy5000.DAL
{
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext()
    {

    }

    public ApplicationDbContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<QuestionsAnswers> QuestionsAnswers { get; set; }
    public DbSet<UserData> UserData { get; set; }
    public DbSet<UserFavorite> UserFavorite { get; set; }

    private static IConfigurationRoot _configuration;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

        _configuration = builder.Build();
        string cnstr = _configuration.GetConnectionString("ConnectionString");
        optionsBuilder.UseSqlServer(cnstr);
      }
    }
    public List<UserData> GetAllUsers()
    {
      return UserData.ToList();
    }
    public bool DeleteUser(int id)
    {
      UserData user = GetUserById(id);
      if (user != null)
      {
        UserData.Remove(user);
        SaveChanges();
        return true;
      }
      return false;
    }
    public UserData GetUser(string userName)
    {
      UserData user = GetAllUsers()
        .FirstOrDefault(x => x.UserName
        .ToLower()
        .Trim() == userName
        .ToLower()
        .Trim());

      if (user == null)
      {
        return null;
      }
      return user;
    }
    public UserData GetUserById(int id)
    {
      UserData user = GetAllUsers()
        .FirstOrDefault(x => x.Id == id);
      if (user == null)
      {
        return null;
      }
      return user;
    }
    public UserData AddUser(string userName, string userPassword)
    {
      UserData toAdd = GetUser(userName);
      if (toAdd != null)
      {
        return null;
      }
      UserData.Add(new UserData()
      {
        UserName = userName,
        UserPassword = userPassword
      });
      SaveChanges();
      return GetUser(userName);
    }
    public QuestionsAnswers FavoriteQuestionAnswer(int studyId, int userId)
    {
      QuestionsAnswers questionAnswer = GetQuestionAnswerByID(studyId);
      UserData userData = GetUserById(userId);
      UserFavorite userFavorite = new UserFavorite()
      {
        QuestionsAnswersId = questionAnswer.Id,
        UserDataId = userData.Id
      };
      if (userData != null && questionAnswer != null)
      {
        UserFavorite.Add(userFavorite);
        SaveChanges();
        return questionAnswer;
      }
      return null;
    }
    public List<QuestionsAnswers> GetAllQuestionsAndAnswers()
    {
      return QuestionsAnswers.ToList();
    }
    public QuestionsAnswers GetQuestionAnswerByID(int studyId)
    {
      QuestionsAnswers study = GetAllQuestionsAndAnswers()
        .FirstOrDefault(x => x.Id == studyId);
      if (study == null)
      {
        return null;
      }
      return study;
    }

    public QuestionsAnswers GetStudyByQAndA(string question, string answer)
    {
      return GetAllQuestionsAndAnswers()
        .FirstOrDefault(x => x.Question
        .ToLower()
        .Trim() == question
        .ToLower()
        .Trim() && x.Answer
        .ToLower()
        .Trim() == answer
        .ToLower()
        .Trim());
    }

    public List<QuestionsAnswers> GetAllFavorites(int userId)
    {
      List<QuestionsAnswers> favorites = JustFavorites()
        .Where(x => x.UserDataId == userId)
        .Select(x => GetQuestionAnswerByID(x.QuestionsAnswersId))
        .ToList();

      if (favorites == null)
      {
        return null;
      }
      return favorites;
    }
    public QuestionsAnswers RemoveQuestionAnswer(int id)
    {
      QuestionsAnswers toRemove = GetQuestionAnswerByID(id);
      if (toRemove == null)
      {
        return toRemove;
      }
      QuestionsAnswers.Remove(toRemove);
      SaveChanges();
      return toRemove;
    }
    public QuestionsAnswers AddQuestionAnswer(string question, string answer)
    {
      QuestionsAnswers toAdd = GetStudyByQAndA(question, answer);
      if (toAdd != null)
      {
        return null;
      }
      QuestionsAnswers study = new QuestionsAnswers()
      {
        Question = question,
        Answer = answer
      };
      QuestionsAnswers.Add(study);
      SaveChanges();
      return study;
    }

    public List<UserFavorite> JustFavorites()
    {
      return UserFavorite.ToList();
    }
    public bool DeleteUserFavoriteById(int userId, int studyId)
    {
      UserFavorite favorite = JustFavorites()
        .Where(x => x.UserDataId == userId)
        .FirstOrDefault(x => x.QuestionsAnswersId == studyId);

      if (favorite == null)
      {
        return false;
      }
      UserFavorite.Remove(favorite);
      SaveChanges();

      return true;
    }
  }
}




