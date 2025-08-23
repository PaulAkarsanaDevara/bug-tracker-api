import { injectable } from "tsyringe";
import { IBug } from "../../interfaces/bug.interface";
import Bug from "../../models/Bug";

@injectable()
export class BugService {

  async findAll(
      page: number = 1,
      limit: number = 10,
      sort: 'asc' | 'desc' = 'desc',
      status?: string,
      priority?: string,
      search?: string
    ) {
    const skip: number = (page - 1) * limit;
    
    const query: any = {};
    if (status) query.status = status;
    if (priority) query.priority = priority

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },  
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const bugs = await Bug.find(query)
            .populate('createdBy', 'name -_id')
            .populate('assignedTo', 'name -_id')
            .sort({ createdAt: sort === "asc" ? 1 : -1 })
            .skip(skip)
            .limit(limit)
            .select("-__v -label");

    const total: number = await Bug.countDocuments(query);
    
    return {
      data: bugs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    }

  }

  async findById(id: string) {
    return await Bug.findById(id).select("-__v");
  }

  async createBug(data: Omit<IBug, '_id'>) {
    const { title, description, priority, status, createdBy, assignedTo , label } = data;
    const bug = new Bug({ title, description, priority, status, createdBy, assignedTo, label });

    await bug.save();

    await bug.populate([
      { path: "createdBy", select: "name -_id" },
      { path: "assignedTo", select: "name -_id" },
    ]);


    return bug;
  }

  async assignBug(id: string, updateData: Partial<IBug>) {
    const { assignedTo } = updateData;
    return await Bug.findByIdAndUpdate(id, { assignedTo }, { new: true})
          .populate([
              { path: "createdBy", select: "name -_id" },
              { path: "assignedTo", select: "name -_id" },
          ]).select("-__v");
  }

  async updateBug(id: string, updateData: Partial<IBug>) {
    return await Bug.findByIdAndUpdate(id, updateData, { new: true })
        .select("-__v"  );
  }

  async deleteBug(id: string) {
    return await Bug.findByIdAndDelete(id);
  }

}
