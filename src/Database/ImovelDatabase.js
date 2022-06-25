//Importação do plugin SQLite
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

//Variáveis de conexão/criação do banco de dados
const database_name = 'Imovel.db'; //Nome do banco de dados
const database_version = '1.0'; //Versão do banco de dados
const database_displayname = 'Imovel Database'; //Nome de exibição do banco de dados
const database_size = 200000; //tamanho do banco de dados

//exportando a classe com o CRUD e inicialização do database
export default class ImovelDatabase {
  Conectar() {
    let db;
    return new Promise(resolve => {
      console.log('Checando a integridade do plugin ...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integridade Ok ...');
          console.log('Abrindo Banco de Dados ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Banco de dados Aberto');
              db.executeSql('SELECT 1 FROM Imovel LIMIT 1')
                .then(() => {
                  console.log(
                    'O banco de dados está pronto ... Executando Consulta SQL ...',
                  );
                })
                .catch(error => {
                  console.log('Erro Recebido: ', error);
                  console.log(
                    'O Banco de dados não está pronto ... Criando Dados',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS Imovel (id INTEGER PRIMARY KEY AUTOINCREMENT, imovel varchar(100), finalidade varchar(30), preco double, imagem text)',
                    );
                  })
                    .then(() => {
                      console.log('Tabela criada com Sucesso');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest Falhou - plugin não funcional');
        });
    });
  }

  Desconectar(db) {
    if (db) {
      console.log('Fechando Banco de Dados');
      db.close()
        .then(status => {
          console.log('Banco de dados Desconectado!!');
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log('A conexão com o banco não está aberta');
    }
  }

  Listar() {
    return new Promise(resolve => {
      const imoveis = [];
      this.Conectar()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT i.id, i.imovel, i.finalidade, i.preco, i.imagem FROM Imovel i',
              [],
            ).then(([tx, resultados]) => {
              console.log('Consulta completa');
              var len = resultados.rows.length;
              for (let i = 0; i < len; i++) {
                let row = resultados.rows.item(i);
                const {id, imovel, finalidade, preco, imagem} = row;
                imoveis.push({id, imovel, finalidade, preco, imagem});
              }
              console.log(imoveis);
              resolve(imoveis);
            });
          })
            .then(result => {
              this.Desconectar(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // BuscarPorId(id) {
  //   console.log(id);
  //   return new Promise(resolve => {
  //     this.Conectar()
  //       .then(db => {
  //         db.transaction(tx => {
  //           tx.executeSql('SELECT * FROM Imovel WHERE id = ?', [id]).then(
  //             ([tx, resultados]) => {
  //               console.log(resultados);
  //               if (resultados.rows.length > 0) {
  //                 let row = resultados.rows.item(0);
  //                 resolve(row);
  //               }
  //             },
  //           );
  //         })
  //           .then(result => {
  //             this.Desconectar(db);
  //           })
  //           .catch(err => {
  //             console.log(err);
  //           });
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   });
  // }

  Adicionar(imo) {
    return new Promise(resolve => {
      this.Conectar()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('INSERT INTO Imovel VALUES (?, ?, ?, ?, ?)', [
              imo.id,
              imo.imovel,
              imo.finalidade,
              imo.preco,
              imo.imagem,
            ]).then(([tx, resultados]) => {
              resolve(resultados);
            });
          })
            .then(result => {
              this.Desconectar(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

//   Aluguel(imo) {  
//     return new Promise((resolve) => {    
//         this.Conectar().then((db) => {      
//             db.transaction((tx) => {        
//                 tx.executeSql("INSERT INTO Imovel SET finalidade = 'Aluguel' VALUES (?)", [imo.finalidade,]).then(([tx, results]) => {          
//                 resolve(results);        
//             });      
//         }).then((result) => {        
//               this.Desconectar(db);      
//             }).catch((err) => {        
//               console.log(err);      
//             });    
//         }).catch((err) => {     
//             console.log(err);    
//         });  
//     });  
// }

// Venda(imo) {  
//     return new Promise((resolve) => {    
//         this.Conectar().then((db) => {      
//             db.transaction((tx) => {        
//                 tx.executeSql("INSERT INTO Imovel SET finalidade = 'Aluguel' VALUES (?)", [imo.finalidade,]).then(([tx, results]) => {          
//                 resolve(results);        
//             });      
//         }).then((result) => {        
//               this.Desconectar(db);      
//             }).catch((err) => {        
//               console.log(err);      
//             });    
//         }).catch((err) => {     
//             console.log(err);    
//         });  
//     });  
// }

  Deletar(id) {
    return new Promise(resolve => {
      this.Conectar()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('DELETE FROM Imovel WHERE id = ?', [id]).then(
              ([tx, resultados]) => {
                console.log(resultados);
                resolve(resultados);
              },
            );
          })
            .then(result => {
              this.Desconectar(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}
