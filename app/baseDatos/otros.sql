insert into tablaPresupuesto VALUES(1,"Presupuesto de Compra");
insert into tablaPresupuesto VALUES(2,"Presupuesto de Costos Indirectos");
insert into tablaPresupuesto VALUES(3,"Presupuesto de Mano de Obra");
insert into tablaPresupuesto VALUES(4,"Presupuesto de Gastos Administrativos");
insert into tablaPresupuesto VALUES(5,"Presupuesto de Investigacion");

// Consulta uder y empresas
SELECT DISTINCT u.nombre , tmp.tipo ,tmp.nomEmpr,tmp.idEmpr  
from Usuario u, (SELECT t.idUser , t.tipo , e.nombre as nomEmpr , e.idEmpr
                FROM trabaja t , Empresa e
                where t.idEmpr = e.idEmpr)tmp
where u.idUser = tmp.idUser
// otro 
select t1.nombre as nomEmp, t.nomUser, t.nomEmp
from (select e.idUser,e.idEmpr, e.nombre as nomEmp, r.nombre as nomUser
      from Empresa e join Usuario r on (e.idUser = r.idUser) where e.idUser != 1) t
      join
     (select distinct e.idUser,e.idEmpr, r.nombre
      from trabaja e join Usuario r on (e.idUser = r.idUser) where e.idUser = 1) t1 on (t.idEmpr = t1.idEmpr)
union
select r.nombre as nomEmp,r.nombre as nomJefe, e.nombre as nomEmp
from Empresa e join Usuario r on (e.idUser = r.idUser)
where e.idUser = 1



select distinct x.nomEmp, x.nomDue, x.nomEmpr, t.nombreTemporada, t.fechaIni, t.fechaFin
from (select t.nombre as nomEmp, t1.nomUser as nomDue, t1.nomEmp as nomEmpr, t.idTemp, t.idEmpr
from (select distinct u.nombre, t.idEmpr, t.idTemp from (select idUser, idEmpr, idTemp from trabaja where idUser = 1) t join Usuario u on (t.idUser = u.idUser )) t
 join (select u.nombre as nomUser, e.idEmpr, e.nombre as nomEmp from Usuario u join Empresa e on (e.idUser = u.idUser)) t1
 on (t.idEmpr = t1.idEmpr)) x join Temporada t on (t.idEmpr = x.idEmpr and t.idTemp = x.idTemp)


// FUNCIONA LA PARTE PARA LOS USUARIO EN EL WHERE EN LA LINEA 22
select x.nomEmp, x.nomDue, x.nomEmpr, t.nombreTemporada, t.fechaIni, t.fechaFin
from (select t.nombre as nomEmp, t1.nomUser as nomDue, t1.nomEmp as nomEmpr, t.idTemp, t.idEmpr
from (select distinct u.nombre, t.idEmpr, t.idTemp from (select idUser, idEmpr, idTemp from trabaja where idUser = 1) t join Usuario u on (t.idUser = u.idUser )) t join
(select u.nombre as nomUser, e.idEmpr, e.nombre as nomEmp from Usuario u join Empresa e on (e.idUser = u.idUser)) t1 on (t.idEmpr = t1.idEmpr)) x join
Temporada t on (t.idEmpr = x.idEmpr and t.idTemp = x.idTemp)
