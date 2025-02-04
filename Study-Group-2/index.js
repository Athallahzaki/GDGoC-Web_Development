let notes = [
    {
      id: 1,
      heading: "Mempelajari Javascript",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus non expedita similique tempora tempore exercitationem. Accusamus sint porro iste quos velit aperiam voluptas placeat error nulla maxime id, deserunt eum.",
      created_by: "John Doe",
      created_at: Date.parse("February 1, 2025 10:00:00") // bisa menggunakan Date.now()
    },
  ];
  
  let currentId = 2;
  
  const createNote = (heading, description, createdBy) => {
    const createdNote = {
      id: currentId,
      heading,
      description,
      created_by: createdBy,
      created_at: Date.now()
    };

    notes.push(createdNote);
    currentId++;
  };
  
  const readNote = () => {
    console.log(notes)
  };
  
  const updateNote = (id, heading, description) => {
    const note = notes.find(note => note.id = id);

    note.heading = heading;
    note.description = description;
  };
  
  const deleteNote = (id) => {
    const noteIndex = notes.findIndex(note => note.id = id);
    notes.splice(noteIndex, 1);
  };
  
  // mengetes kode (diharapkan untuk tidak diganti): 
  createNote("Belajar React", "Mempelajari dasar-dasar React dan cara membuat komponen.", "Jane Doe");
  readNote();
  console.log("=================================================================================================================");
  updateNote(1, "Mempelajari JavaScript Lanjutan", "Mempelajari konsep lanjutan dalam JavaScript.");
  readNote();
  console.log("=================================================================================================================");
  deleteNote(1);
  readNote();