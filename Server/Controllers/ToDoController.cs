using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Server.Context;
using Server.Model;

namespace Server.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ToDoController : Controller
    {
        private readonly ToDoContext _db = new ToDoContext();

        //GET /all
        [HttpGet]
        [ActionName("all")]
        public async Task<List<TaskItem>> Get() => await _db.TaskItems.ToListAsync();

        //PUT /update
        [HttpPut]
        [ActionName("update")]
        [Consumes("application/json")]
        public async Task<HttpStatusCode> Put([FromBody] TaskItem item)
        {
            try
            {
                _db.TaskItems.Update(item);
                await _db.SaveChangesAsync();
                return HttpStatusCode.Accepted;
            }
            catch (Exception)
            {
                return HttpStatusCode.BadRequest;
            }
        }

        //POST /create
        [HttpPost]
        [ActionName("create")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public async Task<TaskItem> Post([FromBody] TaskItem item)
        {
            if (item == null)
            {
                return null;
            }
                
            _db.TaskItems.Add(item);
            _db.SaveChanges();
            return await _db.TaskItems.FindAsync(item.Id);
        }

        //DELETE /remove/id
        [HttpDelete("{id}")]
        [ActionName("remove")]
        public async Task<HttpStatusCode> Delete(int? id)
        {
            if (id == null)
            {
                return HttpStatusCode.BadRequest;
            }

            var item = await _db.TaskItems.FindAsync(id);
            if (item == null)
            {
                return HttpStatusCode.NotFound;
            }
            _db.TaskItems.Remove(item);
            await _db.SaveChangesAsync();
            return HttpStatusCode.Accepted;
        }
    }
}