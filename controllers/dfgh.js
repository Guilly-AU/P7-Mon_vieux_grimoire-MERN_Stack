exports.modifyBook = (req, res, next) => {
  // On récupère les données du livre à modifier depuis la requête
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename.split(".")[0]
        }.webp`,
      }
    : { ...req.body };

  // On supprime la propriété "_userId" de l'objet bookObject, car elle ne doit pas être modifiée
  delete bookObject._userId;

  // On recherche le livre à modifier dans la base de données en se basant sur l'ID fourni dans la requête
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      // On vérifie si l'utilisateur qui effectue la modification est bien le propriétaire du livre (basé sur le champ "userId" du livre)
      if (book.userId != req.auth.userId) {
        // Si l'utilisateur n'est pas autorisé à modifier le livre, on envoie une réponse avec le code HTTP 401 (Unauthorized) et un message d'erreur
        res.status(401).json({ message: "Not authorized" });
      } else if (req.file) {
        // Si un nouveau fichier image est envoyé dans la requête, cela signifie que l'image doit être mise à jour

        // On extrait le nom du fichier de l'image précédente à partir de l'URL stockée dans la base de données
        const filename = book.imageUrl.split("/images")[1];

        // On supprime l'image précédente du serveur en utilisant le nom de fichier extrait
        fs.unlink(`images/${filename}`, () => {});

        // Ensuite, on met à jour le livre dans la base de données avec les nouvelles informations, y compris la nouvelle URL de l'image
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Livre modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      // En cas d'erreur lors de la recherche du livre dans la base de données, on envoie une réponse avec le code HTTP 400 (Bad Request) et un message d'erreur
      res.status(400).json({ error });
    });
};
