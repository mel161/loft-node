exports.MapNews = (dbNews) => {
  return {
    id: dbNews.Id,
    theme: dbNews.Theme,
    text: dbNews.Text,
    date: dbNews.Date,
    user: dbNews.User
  }
};

exports.MapUser = (dbUser) => {
  return {
    id: dbUser.Id,
    username: dbUser.Name,
    password: dbUser.Password,
    firstName: dbUser.FirstName,
    surName: dbUser.LastName,
    middleName: dbUser.MiddleName,
    image: dbUser.Avatar,
    permission: dbUser.Permission.Value,
    permissionId: dbUser.PermissionId
  }
};
