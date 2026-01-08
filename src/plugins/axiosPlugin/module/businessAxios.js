import { axiosFn, downloadAxiosFn } from "../axiosPlugin";

// 业务数据模型相关接口
const businessAxios = {
  /**
   * 调用归档文件-相关API
   */
  //根据分类ID查询文件列表
  getArchiveFileListByCategoryId(param) {
    return axiosFn({ url: `/v1/archiveFile/category/${param.categoryId}`, param, method: "get" });
  },
  //查询分类下的文件详情
  getArchiveFileDetailById(param) {
    return axiosFn({ url: `/v1/archiveFile/category/${param.categoryId}/${param.id}`, param, method: "get" });
  },
  //在分类下新增文件
  addArchiveFile(param) {
    return axiosFn({ url: `/v1/archiveFile/category/${param.categoryId}`, param, method: "post" });
  },
  //更新分类下的文件
  editArchiveFile(param) {
    return axiosFn({ url: `/v1/archiveFile/category/${param.categoryId}/${param.id}`, param, method: "put" });
  },
  //删除分类下的文件
  removeArchiveFile(param) {
    return axiosFn({ url: `/v1/archiveFile/category/${param.categoryId}/${param.id}`, param, method: "delete" });
  },
  //根据ids批量删除
  removeBatchArchiveFile(param) {
    return axiosFn({ url: `/v1/archiveFile/delete/${param.ids}`, param, method: "delete" });
  },
  //批量下载归档文件
  downloadArchiveFile(param) {
    return downloadAxiosFn({ url: `/v1/archiveFile/category/${param.categoryId}/download`, param, method: "get", fileName: "归档文件.zip" });
  },
  //下载所有归档文件
  downloadAllArchiveFile(param) {
    return downloadAxiosFn({ url: "/v1/archiveFile/download/all", param, method: "get", fileName: "全部归档文件.zip" });
  },
  /**
    * 调用归档文件分类-相关API
    */
  // 获取归档文件分类详情
  getArchiveFileCategory(param) {
    return axiosFn({ url: `/v1/archiveFileCategory/${param.id}` });
  },
  // 查询单条归档文件分类
  findOneArchiveFileCategory(param) {
    return axiosFn({ url: "/v1/archiveFileCategory/find/one", param });
  },
  // 获取归档文件分类列表
  queryArchiveFileCategory(param) {
    return axiosFn({ url: "/v1/archiveFileCategory", param });
  },
  // 新增归档文件分类
  addArchiveFileCategory(param) {
    return axiosFn({ url: "/v1/archiveFileCategory", param, method: "post" });
  },
  // 编辑归档文件分类
  editArchiveFileCategory(param) {
    return axiosFn({ url: `/v1/archiveFileCategory/${param.id}`, param, method: "put" });
  },
  // 删除归档文件分类，param为map
  removeArchiveFileCategory(param) {
    return axiosFn({ url: "/v1/archiveFileCategory", param, method: "delete" });
  },
  // 批量删除归档文件分类，param.ids为逗号分割的id字符串
  removeBatchArchiveFileCategory(param) {
    return axiosFn({ url: `/v1/archiveFileCategory/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增归档文件分类
  addBatchArchiveFileCategory(param) {
    return axiosFn({ url: "/v1/archiveFileCategory/batch/add", param, method: "post" });
  },
  //管理员新增分类
  addArchiveFileCategoryAdmin(param) {
    return axiosFn({ url: "/v1/archiveFileCategory/", param, method: "post" });
  },
  //获取树结构的分类列表
  getArchiveFileCategoryTree(param) {
    return axiosFn({ url: "/v1/archiveFileCategory/tree", param, method: "get" });
  },
  //管理员分页查询分类列表
  getArchiveFileCategoryAdmin(param) {
    return axiosFn({ url: `/v1/archiveFileCategory/${param.id}`, param, method: "get" });
  },
  //管理员更新分类
  editArchiveFileCategoryAdmin(param) {
    return axiosFn({ url: `/v1/archiveFileCategory/${param.id}`, param, method: "put" });
  },
  //管理员删除分类 
  removeArchiveFileCategoryAdmin(param) {
    return axiosFn({ url: `/v1/archiveFileCategory/${param.id}`, param, method: "delete" });
  },
  //管理员查询分类详情
  getArchiveFileCategoryAdminDetail(param) {
    return axiosFn({ url: `/v1/archiveFileCategory/${param.id}`, param, method: "get" });
  },
  /**
    * 调用主要工程量数据-相关API
    */
  // 获取主要工程量数据详情
  getMainProjectData(param) {
    return axiosFn({ url: `/v1/mainProjectData/${param.id}` });
  },
  // 查询单条主要工程量数据
  findOneMainProjectData(param) {
    return axiosFn({ url: "/v1/mainProjectData/find/one", param });
  },
  // 获取主要工程量数据列表
  queryMainProjectData(param) {
    return axiosFn({ url: "/v1/mainProjectData", param });
  },
  // 新增主要工程量数据
  addMainProjectData(param) {
    return axiosFn({ url: "/v1/mainProjectData", param, method: "post" });
  },
  // 编辑主要工程量数据
  editMainProjectData(param) {
    return axiosFn({ url: `/v1/mainProjectData/${param.id}`, param, method: "put" });
  },
  // 删除主要工程量数据，param为map
  removeMainProjectData(param) {
    return axiosFn({ url: "/v1/mainProjectData", param, method: "delete" });
  },
  // 批量删除主要工程量数据，param.ids为逗号分割的id字符串
  removeBatchMainProjectData(param) {
    return axiosFn({ url: `/v1/mainProjectData/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增主要工程量数据
  addBatchMainProjectData(param) {
    return axiosFn({ url: "/v1/mainProjectData/batch/add", param, method: "post" });
  },
  /**
    * 调用规章制度分类-相关API
    */
  // 获取规章制度分类详情
  getRegulationCategory(param) {
    return axiosFn({ url: `/v1/regulationCategory/${param.id}` });
  },
  // 查询单条规章制度分类
  findOneRegulationCategory(param) {
    return axiosFn({ url: "/v1/regulationCategory/find/one", param });
  },
  // 获取规章制度分类列表
  queryRegulationCategory(param) {
    return axiosFn({ url: "/v1/regulationCategory", param });
  },
  // 新增规章制度分类
  addRegulationCategory(param) {
    return axiosFn({ url: "/v1/regulationCategory", param, method: "post" });
  },
  // 编辑规章制度分类
  editRegulationCategory(param) {
    return axiosFn({ url: `/v1/regulationCategory/${param.id}`, param, method: "put" });
  },
  // 删除规章制度分类，param为map
  removeRegulationCategory(param) {
    return axiosFn({ url: "/v1/regulationCategory", param, method: "delete" });
  },
  // 批量删除规章制度分类，param.ids为逗号分割的id字符串
  removeBatchRegulationCategory(param) {
    return axiosFn({ url: `/v1/regulationCategory/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增规章制度分类
  addBatchRegulationCategory(param) {
    return axiosFn({ url: "/v1/regulationCategory/batch/add", param, method: "post" });
  },
  //管理员新增分类
  addRegulationCategoryAdmin(param) {
    return axiosFn({ url: "/v1/regulationCategory/", param, method: "post" });
  },
  //管理员分页查询分类列表
  queryRegulationCategoryAdmin(param) {
    return axiosFn({ url: "/v1/regulationCategory/list", param });
  },
  //管理员查询分类详情
  getRegulationCategoryAdmin(param) {
    return axiosFn({ url: `/v1/regulationCategory/${param.id}`, param });
  },
  //获取树结构的分类列表
  getRegulationCategoryTree(param) {
    return axiosFn({ url: "/v1/regulationCategory/tree", param });
  },
  //管理员更新分类
  editRegulationCategoryAdmin(param) {
    return axiosFn({ url: `/v1/regulationCategory/${param.id}`, param, method: "put" });
  },
  //管理员删除分类
  removeRegulationCategoryAdmin(param) {
    return axiosFn({ url: `/v1/regulationCategory/${param.id}`, param, method: "delete" });
  },
  /**
  * 调用规章制度-相关API
  */
  // 获取规章制度详情
  getRulesRegulation(param) {
    return axiosFn({ url: `/v1/rulesRegulation/${param.id}` });
  },
  // 查询单条规章制度
  findOneRulesRegulation(param) {
    return axiosFn({ url: "/v1/rulesRegulation/find/one", param });
  },
  // 获取规章制度列表
  queryRulesRegulation(param) {
    return axiosFn({ url: "/v1/rulesRegulation", param });
  },
  // 新增规章制度
  addRulesRegulation(param) {
    return axiosFn({ url: "/v1/rulesRegulation", param, method: "post" });
  },
  // 编辑规章制度
  editRulesRegulation(param) {
    return axiosFn({ url: `/v1/rulesRegulation/${param.id}`, param, method: "put" });
  },
  // 删除规章制度，param为map
  removeRulesRegulation(param) {
    return axiosFn({ url: "/v1/rulesRegulation", param, method: "delete" });
  },
  // 批量删除规章制度，param.ids为逗号分割的id字符串
  removeBatchRulesRegulation(param) {
    return axiosFn({ url: `/v1/rulesRegulation/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增规章制度
  addBatchRulesRegulation(param) {
    return axiosFn({ url: "/v1/rulesRegulation/batch/add", param, method: "post" });
  },
  //下载规章制度
  downloadRulesRegulation(param) {
    return downloadAxiosFn({ url: `/v1/rulesRegulation/category/${param.categoryId}/download`, param, method: "get", fileName: "规章制度文件.zip" });
  },
  //下载所有规章制度
  downloadAllRulesRegulation(param) {
    return downloadAxiosFn({ url: "/v1/rulesRegulation/download/all", param, method: "get", fileName: "全部规章制度文件.zip" });
  },
  //在分类下新增文件
  addRulesRegulationCategory(param) {
    return axiosFn({ url: `/v1/rulesRegulation/category/${param.categoryId}`, param, method: "post" });
  },
  /**
  * 调用稽查检查清单管理-相关API
  */
  // 获取稽查检查清单管理详情
  getInspectionChecklistManagement(param) {
    return axiosFn({ url: `/v1/inspectionChecklistManagement/${param.id}` });
  },
  // 查询单条稽查检查清单管理
  findOneInspectionChecklistManagement(param) {
    return axiosFn({ url: "/v1/inspectionChecklistManagement/find/one", param });
  },
  // 获取稽查检查清单管理列表
  queryInspectionChecklistManagement(param) {
    return axiosFn({ url: "/v1/inspectionChecklistManagement", param });
  },
  // 新增稽查检查清单管理
  addInspectionChecklistManagement(param) {
    return axiosFn({ url: "/v1/inspectionChecklistManagement", param, method: "post" });
  },
  // 编辑稽查检查清单管理
  editInspectionChecklistManagement(param) {
    return axiosFn({ url: `/v1/inspectionChecklistManagement/${param.id}`, param, method: "put" });
  },
  // 删除稽查检查清单管理，param为map
  removeInspectionChecklistManagement(param) {
    return axiosFn({ url: "/v1/inspectionChecklistManagement", param, method: "delete" });
  },
  // 批量删除稽查检查清单管理，param.ids为逗号分割的id字符串
  removeBatchInspectionChecklistManagement(param) {
    return axiosFn({ url: `/v1/inspectionChecklistManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增稽查检查清单管理
  addBatchInspectionChecklistManagement(param) {
    return axiosFn({ url: "/v1/inspectionChecklistManagement/batch/add", param, method: "post" });
  },
  /**
  * 调用平行检测-混凝土抗冻检验报告-相关API
  */
  // 获取平行检测-混凝土抗冻检验报告详情
  getParallelCheckThirteen(param) {
    return axiosFn({ url: `/v1/parallelCheckThirteen/${param.id}` });
  },
  // 查询单条平行检测-混凝土抗冻检验报告
  findOneParallelCheckThirteen(param) {
    return axiosFn({ url: "/v1/parallelCheckThirteen/find/one", param });
  },
  // 获取平行检测-混凝土抗冻检验报告列表
  queryParallelCheckThirteen(param) {
    return axiosFn({ url: "/v1/parallelCheckThirteen", param });
  },
  // 新增平行检测-混凝土抗冻检验报告
  addParallelCheckThirteen(param) {
    return axiosFn({ url: "/v1/parallelCheckThirteen", param, method: "post" });
  },
  // 编辑平行检测-混凝土抗冻检验报告
  editParallelCheckThirteen(param) {
    return axiosFn({ url: `/v1/parallelCheckThirteen/${param.id}`, param, method: "put" });
  },
  // 删除平行检测-混凝土抗冻检验报告，param为map
  removeParallelCheckThirteen(param) {
    return axiosFn({ url: "/v1/parallelCheckThirteen", param, method: "delete" });
  },
  // 批量删除平行检测-混凝土抗冻检验报告，param.ids为逗号分割的id字符串
  removeBatchParallelCheckThirteen(param) {
    return axiosFn({ url: `/v1/parallelCheckThirteen/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增平行检测-混凝土抗冻检验报告
  addBatchParallelCheckThirteen(param) {
    return axiosFn({ url: "/v1/parallelCheckThirteen/batch/add", param, method: "post" });
  },
  /**
  * 调用平行检测-混凝土抗渗检验报告-相关API
  */
  // 获取平行检测-混凝土抗渗检验报告详情
  getParallelCheckTwelve(param) {
    return axiosFn({ url: `/v1/parallelCheckTwelve/${param.id}` });
  },
  // 查询单条平行检测-混凝土抗渗检验报告
  findOneParallelCheckTwelve(param) {
    return axiosFn({ url: "/v1/parallelCheckTwelve/find/one", param });
  },
  // 获取平行检测-混凝土抗渗检验报告列表
  queryParallelCheckTwelve(param) {
    return axiosFn({ url: "/v1/parallelCheckTwelve", param });
  },
  // 新增平行检测-混凝土抗渗检验报告
  addParallelCheckTwelve(param) {
    return axiosFn({ url: "/v1/parallelCheckTwelve", param, method: "post" });
  },
  // 编辑平行检测-混凝土抗渗检验报告
  editParallelCheckTwelve(param) {
    return axiosFn({ url: `/v1/parallelCheckTwelve/${param.id}`, param, method: "put" });
  },
  // 删除平行检测-混凝土抗渗检验报告，param为map
  removeParallelCheckTwelve(param) {
    return axiosFn({ url: "/v1/parallelCheckTwelve", param, method: "delete" });
  },
  // 批量删除平行检测-混凝土抗渗检验报告，param.ids为逗号分割的id字符串
  removeBatchParallelCheckTwelve(param) {
    return axiosFn({ url: `/v1/parallelCheckTwelve/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增平行检测-混凝土抗渗检验报告
  addBatchParallelCheckTwelve(param) {
    return axiosFn({ url: "/v1/parallelCheckTwelve/batch/add", param, method: "post" });
  },
  /**
  * 调用平行检测-岩块物理性质及力学性质检验报告-相关API
  */
  // 获取平行检测-岩块物理性质及力学性质检验报告详情
  getParallelCheckEleven(param) {
    return axiosFn({ url: `/v1/parallelCheckEleven/${param.id}` });
  },
  // 查询单条平行检测-岩块物理性质及力学性质检验报告
  findOneParallelCheckEleven(param) {
    return axiosFn({ url: "/v1/parallelCheckEleven/find/one", param });
  },
  // 获取平行检测-岩块物理性质及力学性质检验报告列表
  queryParallelCheckEleven(param) {
    return axiosFn({ url: "/v1/parallelCheckEleven", param });
  },
  // 新增平行检测-岩块物理性质及力学性质检验报告
  addParallelCheckEleven(param) {
    return axiosFn({ url: "/v1/parallelCheckEleven", param, method: "post" });
  },
  // 编辑平行检测-岩块物理性质及力学性质检验报告
  editParallelCheckEleven(param) {
    return axiosFn({ url: `/v1/parallelCheckEleven/${param.id}`, param, method: "put" });
  },
  // 删除平行检测-岩块物理性质及力学性质检验报告，param为map
  removeParallelCheckEleven(param) {
    return axiosFn({ url: "/v1/parallelCheckEleven", param, method: "delete" });
  },
  // 批量删除平行检测-岩块物理性质及力学性质检验报告，param.ids为逗号分割的id字符串
  removeBatchParallelCheckEleven(param) {
    return axiosFn({ url: `/v1/parallelCheckEleven/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增平行检测-岩块物理性质及力学性质检验报告
  addBatchParallelCheckEleven(param) {
    return axiosFn({ url: "/v1/parallelCheckEleven/batch/add", param, method: "post" });
  },
  /**
  * 调用平行检测-铜止水接头力学性能检验报告-相关API
  */
  // 获取平行检测-铜止水接头力学性能检验报告详情
  getParallelCheckTen(param) {
    return axiosFn({ url: `/v1/parallelCheckTen/${param.id}` });
  },
  // 查询单条平行检测-铜止水接头力学性能检验报告
  findOneParallelCheckTen(param) {
    return axiosFn({ url: "/v1/parallelCheckTen/find/one", param });
  },
  // 获取平行检测-铜止水接头力学性能检验报告列表
  queryParallelCheckTen(param) {
    return axiosFn({ url: "/v1/parallelCheckTen", param });
  },
  // 新增平行检测-铜止水接头力学性能检验报告
  addParallelCheckTen(param) {
    return axiosFn({ url: "/v1/parallelCheckTen", param, method: "post" });
  },
  // 编辑平行检测-铜止水接头力学性能检验报告
  editParallelCheckTen(param) {
    return axiosFn({ url: `/v1/parallelCheckTen/${param.id}`, param, method: "put" });
  },
  // 删除平行检测-铜止水接头力学性能检验报告，param为map
  removeParallelCheckTen(param) {
    return axiosFn({ url: "/v1/parallelCheckTen", param, method: "delete" });
  },
  // 批量删除平行检测-铜止水接头力学性能检验报告，param.ids为逗号分割的id字符串
  removeBatchParallelCheckTen(param) {
    return axiosFn({ url: `/v1/parallelCheckTen/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增平行检测-铜止水接头力学性能检验报告
  addBatchParallelCheckTen(param) {
    return axiosFn({ url: "/v1/parallelCheckTen/batch/add", param, method: "post" });
  },
  /**
  * 调用平行检测-弯沉值检测报告-相关API
  */
  // 获取平行检测-弯沉值检测报告详情
  getParallelCheckNine(param) {
    return axiosFn({ url: `/v1/parallelCheckNine/${param.id}` });
  },
  // 查询单条平行检测-弯沉值检测报告
  findOneParallelCheckNine(param) {
    return axiosFn({ url: "/v1/parallelCheckNine/find/one", param });
  },
  // 获取平行检测-弯沉值检测报告列表
  queryParallelCheckNine(param) {
    return axiosFn({ url: "/v1/parallelCheckNine", param });
  },
  // 新增平行检测-弯沉值检测报告
  addParallelCheckNine(param) {
    return axiosFn({ url: "/v1/parallelCheckNine", param, method: "post" });
  },
  // 编辑平行检测-弯沉值检测报告
  editParallelCheckNine(param) {
    return axiosFn({ url: `/v1/parallelCheckNine/${param.id}`, param, method: "put" });
  },
  // 删除平行检测-弯沉值检测报告，param为map
  removeParallelCheckNine(param) {
    return axiosFn({ url: "/v1/parallelCheckNine", param, method: "delete" });
  },
  // 批量删除平行检测-弯沉值检测报告，param.ids为逗号分割的id字符串
  removeBatchParallelCheckNine(param) {
    return axiosFn({ url: `/v1/parallelCheckNine/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增平行检测-弯沉值检测报告
  addBatchParallelCheckNine(param) {
    return axiosFn({ url: "/v1/parallelCheckNine/batch/add", param, method: "post" });
  },
  /**
  * 调用平行检测-压实度检测报告-相关API
  */
  // 获取平行检测-压实度检测报告详情
  getParallelCheckEight(param) {
    return axiosFn({ url: `/v1/parallelCheckEight/${param.id}` });
  },
  // 查询单条平行检测-压实度检测报告
  findOneParallelCheckEight(param) {
    return axiosFn({ url: "/v1/parallelCheckEight/find/one", param });
  },
  // 获取平行检测-压实度检测报告列表
  queryParallelCheckEight(param) {
    return axiosFn({ url: "/v1/parallelCheckEight", param });
  },
  // 新增平行检测-压实度检测报告
  addParallelCheckEight(param) {
    return axiosFn({ url: "/v1/parallelCheckEight", param, method: "post" });
  },
  // 编辑平行检测-压实度检测报告
  editParallelCheckEight(param) {
    return axiosFn({ url: `/v1/parallelCheckEight/${param.id}`, param, method: "put" });
  },
  // 删除平行检测-压实度检测报告，param为map
  removeParallelCheckEight(param) {
    return axiosFn({ url: "/v1/parallelCheckEight", param, method: "delete" });
  },
  // 批量删除平行检测-压实度检测报告，param.ids为逗号分割的id字符串
  removeBatchParallelCheckEight(param) {
    return axiosFn({ url: `/v1/parallelCheckEight/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增平行检测-压实度检测报告
  addBatchParallelCheckEight(param) {
    return axiosFn({ url: "/v1/parallelCheckEight/batch/add", param, method: "post" });
  },
  /**
  * 调用平行检测-粉煤灰检测报告-相关API
  */
  // 获取平行检测-粉煤灰检测报告详情
  getParallelCheckSeven(param) {
    return axiosFn({ url: `/v1/parallelCheckSeven/${param.id}` });
  },
  // 查询单条平行检测-粉煤灰检测报告
  findOneParallelCheckSeven(param) {
    return axiosFn({ url: "/v1/parallelCheckSeven/find/one", param });
  },
  // 获取平行检测-粉煤灰检测报告列表
  queryParallelCheckSeven(param) {
    return axiosFn({ url: "/v1/parallelCheckSeven", param });
  },
  // 新增平行检测-粉煤灰检测报告
  addParallelCheckSeven(param) {
    return axiosFn({ url: "/v1/parallelCheckSeven", param, method: "post" });
  },
  // 编辑平行检测-粉煤灰检测报告
  editParallelCheckSeven(param) {
    return axiosFn({ url: `/v1/parallelCheckSeven/${param.id}`, param, method: "put" });
  },
  // 删除平行检测-粉煤灰检测报告，param为map
  removeParallelCheckSeven(param) {
    return axiosFn({ url: "/v1/parallelCheckSeven", param, method: "delete" });
  },
  // 批量删除平行检测-粉煤灰检测报告，param.ids为逗号分割的id字符串
  removeBatchParallelCheckSeven(param) {
    return axiosFn({ url: `/v1/parallelCheckSeven/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增平行检测-粉煤灰检测报告
  addBatchParallelCheckSeven(param) {
    return axiosFn({ url: "/v1/parallelCheckSeven/batch/add", param, method: "post" });
  },
  /**
  * 调用平行检测-钢筋焊接接头力学性能检验报告-相关API
  */
  // 获取平行检测-钢筋焊接接头力学性能检验报告详情
  getParallelCheckSix(param) {
    return axiosFn({ url: `/v1/parallelCheckSix/${param.id}` });
  },
  // 查询单条平行检测-钢筋焊接接头力学性能检验报告
  findOneParallelCheckSix(param) {
    return axiosFn({ url: "/v1/parallelCheckSix/find/one", param });
  },
  // 获取平行检测-钢筋焊接接头力学性能检验报告列表
  queryParallelCheckSix(param) {
    return axiosFn({ url: "/v1/parallelCheckSix", param });
  },
  // 新增平行检测-钢筋焊接接头力学性能检验报告
  addParallelCheckSix(param) {
    return axiosFn({ url: "/v1/parallelCheckSix", param, method: "post" });
  },
  // 编辑平行检测-钢筋焊接接头力学性能检验报告
  editParallelCheckSix(param) {
    return axiosFn({ url: `/v1/parallelCheckSix/${param.id}`, param, method: "put" });
  },
  // 删除平行检测-钢筋焊接接头力学性能检验报告，param为map
  removeParallelCheckSix(param) {
    return axiosFn({ url: "/v1/parallelCheckSix", param, method: "delete" });
  },
  // 批量删除平行检测-钢筋焊接接头力学性能检验报告，param.ids为逗号分割的id字符串
  removeBatchParallelCheckSix(param) {
    return axiosFn({ url: `/v1/parallelCheckSix/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增平行检测-钢筋焊接接头力学性能检验报告
  addBatchParallelCheckSix(param) {
    return axiosFn({ url: "/v1/parallelCheckSix/batch/add", param, method: "post" });
  },
  /**
  * 调用平行检测-钢筋混凝土用钢筋物理性能检测报告-相关API
  */
  // 获取平行检测-钢筋混凝土用钢筋物理性能检测报告详情
  getParallelCheckFive(param) {
    return axiosFn({ url: `/v1/parallelCheckFive/${param.id}` });
  },
  // 查询单条平行检测-钢筋混凝土用钢筋物理性能检测报告
  findOneParallelCheckFive(param) {
    return axiosFn({ url: "/v1/parallelCheckFive/find/one", param });
  },
  // 获取平行检测-钢筋混凝土用钢筋物理性能检测报告列表
  queryParallelCheckFive(param) {
    return axiosFn({ url: "/v1/parallelCheckFive", param });
  },
  // 新增平行检测-钢筋混凝土用钢筋物理性能检测报告
  addParallelCheckFive(param) {
    return axiosFn({ url: "/v1/parallelCheckFive", param, method: "post" });
  },
  // 编辑平行检测-钢筋混凝土用钢筋物理性能检测报告
  editParallelCheckFive(param) {
    return axiosFn({ url: `/v1/parallelCheckFive/${param.id}`, param, method: "put" });
  },
  // 删除平行检测-钢筋混凝土用钢筋物理性能检测报告，param为map
  removeParallelCheckFive(param) {
    return axiosFn({ url: "/v1/parallelCheckFive", param, method: "delete" });
  },
  // 批量删除平行检测-钢筋混凝土用钢筋物理性能检测报告，param.ids为逗号分割的id字符串
  removeBatchParallelCheckFive(param) {
    return axiosFn({ url: `/v1/parallelCheckFive/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增平行检测-钢筋混凝土用钢筋物理性能检测报告
  addBatchParallelCheckFive(param) {
    return axiosFn({ url: "/v1/parallelCheckFive/batch/add", param, method: "post" });
  },
  /**
  * 调用平行检测-混凝土立方体抗压强度检验报告-相关API
  */
  // 获取平行检测-混凝土立方体抗压强度检验报告详情
  getParallelCheckFour(param) {
    return axiosFn({ url: `/v1/parallelCheckFour/${param.id}` });
  },
  // 查询单条平行检测-混凝土立方体抗压强度检验报告
  findOneParallelCheckFour(param) {
    return axiosFn({ url: "/v1/parallelCheckFour/find/one", param });
  },
  // 获取平行检测-混凝土立方体抗压强度检验报告列表
  queryParallelCheckFour(param) {
    return axiosFn({ url: "/v1/parallelCheckFour", param });
  },
  // 新增平行检测-混凝土立方体抗压强度检验报告
  addParallelCheckFour(param) {
    return axiosFn({ url: "/v1/parallelCheckFour", param, method: "post" });
  },
  // 编辑平行检测-混凝土立方体抗压强度检验报告
  editParallelCheckFour(param) {
    return axiosFn({ url: `/v1/parallelCheckFour/${param.id}`, param, method: "put" });
  },
  // 删除平行检测-混凝土立方体抗压强度检验报告，param为map
  removeParallelCheckFour(param) {
    return axiosFn({ url: "/v1/parallelCheckFour", param, method: "delete" });
  },
  // 批量删除平行检测-混凝土立方体抗压强度检验报告，param.ids为逗号分割的id字符串
  removeBatchParallelCheckFour(param) {
    return axiosFn({ url: `/v1/parallelCheckFour/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增平行检测-混凝土立方体抗压强度检验报告
  addBatchParallelCheckFour(param) {
    return axiosFn({ url: "/v1/parallelCheckFour/batch/add", param, method: "post" });
  },
  /**
  * 调用平行检测-水泥检验报告-相关API
  */
  // 获取平行检测-水泥检验报告详情
  getParallelCheckThree(param) {
    return axiosFn({ url: `/v1/parallelCheckThree/${param.id}` });
  },
  // 查询单条平行检测-水泥检验报告
  findOneParallelCheckThree(param) {
    return axiosFn({ url: "/v1/parallelCheckThree/find/one", param });
  },
  // 获取平行检测-水泥检验报告列表
  queryParallelCheckThree(param) {
    return axiosFn({ url: "/v1/parallelCheckThree", param });
  },
  // 新增平行检测-水泥检验报告
  addParallelCheckThree(param) {
    return axiosFn({ url: "/v1/parallelCheckThree", param, method: "post" });
  },
  // 编辑平行检测-水泥检验报告
  editParallelCheckThree(param) {
    return axiosFn({ url: `/v1/parallelCheckThree/${param.id}`, param, method: "put" });
  },
  // 删除平行检测-水泥检验报告，param为map
  removeParallelCheckThree(param) {
    return axiosFn({ url: "/v1/parallelCheckThree", param, method: "delete" });
  },
  // 批量删除平行检测-水泥检验报告，param.ids为逗号分割的id字符串
  removeBatchParallelCheckThree(param) {
    return axiosFn({ url: `/v1/parallelCheckThree/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增平行检测-水泥检验报告
  addBatchParallelCheckThree(param) {
    return axiosFn({ url: "/v1/parallelCheckThree/batch/add", param, method: "post" });
  },
  /**
  * 调用平行检测-粗骨料检验报告-相关API
  */
  // 获取平行检测-粗骨料检验报告详情
  getParallelCheckTwo(param) {
    return axiosFn({ url: `/v1/parallelCheckTwo/${param.id}` });
  },
  // 查询单条平行检测-粗骨料检验报告
  findOneParallelCheckTwo(param) {
    return axiosFn({ url: "/v1/parallelCheckTwo/find/one", param });
  },
  // 获取平行检测-粗骨料检验报告列表
  queryParallelCheckTwo(param) {
    return axiosFn({ url: "/v1/parallelCheckTwo", param });
  },
  // 新增平行检测-粗骨料检验报告
  addParallelCheckTwo(param) {
    return axiosFn({ url: "/v1/parallelCheckTwo", param, method: "post" });
  },
  // 编辑平行检测-粗骨料检验报告
  editParallelCheckTwo(param) {
    return axiosFn({ url: `/v1/parallelCheckTwo/${param.id}`, param, method: "put" });
  },
  // 删除平行检测-粗骨料检验报告，param为map
  removeParallelCheckTwo(param) {
    return axiosFn({ url: "/v1/parallelCheckTwo", param, method: "delete" });
  },
  // 批量删除平行检测-粗骨料检验报告，param.ids为逗号分割的id字符串
  removeBatchParallelCheckTwo(param) {
    return axiosFn({ url: `/v1/parallelCheckTwo/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增平行检测-粗骨料检验报告
  addBatchParallelCheckTwo(param) {
    return axiosFn({ url: "/v1/parallelCheckTwo/batch/add", param, method: "post" });
  },
  /**
  * 调用平行检测-细骨料（人工砂）检验报告-相关API
  */
  // 获取平行检测-细骨料（人工砂）检验报告详情
  getParallelCheckOne(param) {
    return axiosFn({ url: `/v1/parallelCheckOne/${param.id}` });
  },
  // 查询单条平行检测-细骨料（人工砂）检验报告
  findOneParallelCheckOne(param) {
    return axiosFn({ url: "/v1/parallelCheckOne/find/one", param });
  },
  // 获取平行检测-细骨料（人工砂）检验报告列表
  queryParallelCheckOne(param) {
    return axiosFn({ url: "/v1/parallelCheckOne", param });
  },
  // 新增平行检测-细骨料（人工砂）检验报告
  addParallelCheckOne(param) {
    return axiosFn({ url: "/v1/parallelCheckOne", param, method: "post" });
  },
  // 编辑平行检测-细骨料（人工砂）检验报告
  editParallelCheckOne(param) {
    return axiosFn({ url: `/v1/parallelCheckOne/${param.id}`, param, method: "put" });
  },
  // 删除平行检测-细骨料（人工砂）检验报告，param为map
  removeParallelCheckOne(param) {
    return axiosFn({ url: "/v1/parallelCheckOne", param, method: "delete" });
  },
  // 批量删除平行检测-细骨料（人工砂）检验报告，param.ids为逗号分割的id字符串
  removeBatchParallelCheckOne(param) {
    return axiosFn({ url: `/v1/parallelCheckOne/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增平行检测-细骨料（人工砂）检验报告
  addBatchParallelCheckOne(param) {
    return axiosFn({ url: "/v1/parallelCheckOne/batch/add", param, method: "post" });
  },
  /**
  * 调用单元工程-相关API
  */
  // 获取单元工程详情
  getUnitProject(param) {
    return axiosFn({ url: `/v1/unitProject/${param.id}` });
  },
  // 查询单条单元工程
  findOneUnitProject(param) {
    return axiosFn({ url: "/v1/unitProject/find/one", param });
  },
  // 获取单元工程列表
  queryUnitProject(param) {
    return axiosFn({ url: "/v1/unitProject", param });
  },
  // 新增单元工程
  addUnitProject(param) {
    return axiosFn({ url: "/v1/unitProject", param, method: "post" });
  },
  // 编辑单元工程
  editUnitProject(param) {
    return axiosFn({ url: `/v1/unitProject/${param.id}`, param, method: "put" });
  },
  // 删除单元工程，param为map
  removeUnitProject(param) {
    return axiosFn({ url: "/v1/unitProject", param, method: "delete" });
  },
  // 批量删除单元工程，param.ids为逗号分割的id字符串
  removeBatchUnitProject(param) {
    return axiosFn({ url: `/v1/unitProject/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增单元工程
  addBatchUnitProject(param) {
    return axiosFn({ url: "/v1/unitProject/batch/add", param, method: "post" });
  },
  /**
  * 调用项目划分-相关API
  */
  // 获取项目划分详情
  getProjectDivision(param) {
    return axiosFn({ url: `/v1/projectDivision/${param.id}` });
  },
  // 查询单条项目划分
  findOneProjectDivision(param) {
    return axiosFn({ url: "/v1/projectDivision/find/one", param });
  },
  // 获取项目划分列表
  queryProjectDivision(param) {
    return axiosFn({ url: "/v1/projectDivision", param });
  },
  // 新增项目划分
  addProjectDivision(param) {
    return axiosFn({ url: "/v1/projectDivision", param, method: "post" });
  },
  // 编辑项目划分
  editProjectDivision(param) {
    return axiosFn({ url: `/v1/projectDivision/${param.id}`, param, method: "put" });
  },
  // 删除项目划分，param为map
  removeProjectDivision(param) {
    return axiosFn({ url: "/v1/projectDivision", param, method: "delete" });
  },
  // 批量删除项目划分，param.ids为逗号分割的id字符串
  removeBatchProjectDivision(param) {
    return axiosFn({ url: `/v1/projectDivision/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增项目划分
  addBatchProjectDivision(param) {
    return axiosFn({ url: "/v1/projectDivision/batch/add", param, method: "post" });
  },
  /**
  * 调用检查整改情况--通报结果-相关API
  */
  // 获取检查整改情况--通报结果详情
  getCheckRectification(param) {
    return axiosFn({ url: `/v1/checkRectification/${param.id}` });
  },
  // 查询单条检查整改情况--通报结果
  findOneCheckRectification(param) {
    return axiosFn({ url: "/v1/checkRectification/find/one", param });
  },
  // 获取检查整改情况--通报结果列表
  queryCheckRectification(param) {
    return axiosFn({ url: "/v1/checkRectification", param });
  },
  // 新增检查整改情况--通报结果
  addCheckRectification(param) {
    return axiosFn({ url: "/v1/checkRectification", param, method: "post" });
  },
  // 编辑检查整改情况--通报结果
  editCheckRectification(param) {
    return axiosFn({ url: `/v1/checkRectification/${param.id}`, param, method: "put" });
  },
  // 删除检查整改情况--通报结果，param为map
  removeCheckRectification(param) {
    return axiosFn({ url: "/v1/checkRectification", param, method: "delete" });
  },
  // 批量删除检查整改情况--通报结果，param.ids为逗号分割的id字符串
  removeBatchCheckRectification(param) {
    return axiosFn({ url: `/v1/checkRectification/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增检查整改情况--通报结果
  addBatchCheckRectification(param) {
    return axiosFn({ url: "/v1/checkRectification/batch/add", param, method: "post" });
  },
  /**
  * 调用检查整改情况--整改回复-相关API
  */
  // 获取检查整改情况--整改回复详情
  getReportResult(param) {
    return axiosFn({ url: `/v1/reportResult/${param.id}` });
  },
  // 查询单条检查整改情况--整改回复
  findOneReportResult(param) {
    return axiosFn({ url: "/v1/reportResult/find/one", param });
  },
  // 获取检查整改情况--整改回复列表
  queryReportResult(param) {
    return axiosFn({ url: "/v1/reportResult", param });
  },
  // 新增检查整改情况--整改回复
  addReportResult(param) {
    return axiosFn({ url: "/v1/reportResult", param, method: "post" });
  },
  // 编辑检查整改情况--整改回复
  editReportResult(param) {
    return axiosFn({ url: `/v1/reportResult/${param.id}`, param, method: "put" });
  },
  // 删除检查整改情况--整改回复，param为map
  removeReportResult(param) {
    return axiosFn({ url: "/v1/reportResult", param, method: "delete" });
  },
  // 批量删除检查整改情况--整改回复，param.ids为逗号分割的id字符串
  removeBatchReportResult(param) {
    return axiosFn({ url: `/v1/reportResult/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增检查整改情况--整改回复
  addBatchReportResult(param) {
    return axiosFn({ url: "/v1/reportResult/batch/add", param, method: "post" });
  },
  /**
  * 调用变更单价审核-相关API
  */
  // 获取变更单价审核详情
  getChangePriceReview(param) {
    return axiosFn({ url: `/v1/changePriceReview/${param.id}` });
  },
  // 查询单条变更单价审核
  findOneChangePriceReview(param) {
    return axiosFn({ url: "/v1/changePriceReview/find/one", param });
  },
  // 获取变更单价审核列表
  queryChangePriceReview(param) {
    return axiosFn({ url: "/v1/changePriceReview", param });
  },
  // 新增变更单价审核
  addChangePriceReview(param) {
    return axiosFn({ url: "/v1/changePriceReview", param, method: "post" });
  },
  // 编辑变更单价审核
  editChangePriceReview(param) {
    return axiosFn({ url: `/v1/changePriceReview/${param.id}`, param, method: "put" });
  },
  // 删除变更单价审核，param为map
  removeChangePriceReview(param) {
    return axiosFn({ url: "/v1/changePriceReview", param, method: "delete" });
  },
  // 批量删除变更单价审核，param.ids为逗号分割的id字符串
  removeBatchChangePriceReview(param) {
    return axiosFn({ url: `/v1/changePriceReview/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增变更单价审核
  addBatchChangePriceReview(param) {
    return axiosFn({ url: "/v1/changePriceReview/batch/add", param, method: "post" });
  },
  /**
  * 调用变更指示-相关API
  */
  // 获取变更指示详情
  getChangeInstruction(param) {
    return axiosFn({ url: `/v1/changeInstruction/${param.id}` });
  },
  // 查询单条变更指示
  findOneChangeInstruction(param) {
    return axiosFn({ url: "/v1/changeInstruction/find/one", param });
  },
  // 获取变更指示列表
  queryChangeInstruction(param) {
    return axiosFn({ url: "/v1/changeInstruction", param });
  },
  // 新增变更指示
  addChangeInstruction(param) {
    return axiosFn({ url: "/v1/changeInstruction", param, method: "post" });
  },
  // 编辑变更指示
  editChangeInstruction(param) {
    return axiosFn({ url: `/v1/changeInstruction/${param.id}`, param, method: "put" });
  },
  // 删除变更指示，param为map
  removeChangeInstruction(param) {
    return axiosFn({ url: "/v1/changeInstruction", param, method: "delete" });
  },
  // 批量删除变更指示，param.ids为逗号分割的id字符串
  removeBatchChangeInstruction(param) {
    return axiosFn({ url: `/v1/changeInstruction/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增变更指示
  addBatchChangeInstruction(param) {
    return axiosFn({ url: "/v1/changeInstruction/batch/add", param, method: "post" });
  },
  /**
  * 调用项目文件关联表-相关API
  */
  // 获取项目文件关联表详情
  getProjectFileRelation(param) {
    return axiosFn({ url: `/v1/projectFileRelation/${param.id}` });
  },
  // 查询单条项目文件关联表
  findOneProjectFileRelation(param) {
    return axiosFn({ url: "/v1/projectFileRelation/find/one", param });
  },
  // 获取项目文件关联表列表
  queryProjectFileRelation(param) {
    return axiosFn({ url: "/v1/projectFileRelation", param });
  },
  // 新增项目文件关联表
  addProjectFileRelation(param) {
    return axiosFn({ url: "/v1/projectFileRelation", param, method: "post" });
  },
  // 编辑项目文件关联表
  editProjectFileRelation(param) {
    return axiosFn({ url: `/v1/projectFileRelation/${param.id}`, param, method: "put" });
  },
  // 删除项目文件关联表，param为map
  removeProjectFileRelation(param) {
    return axiosFn({ url: "/v1/projectFileRelation", param, method: "delete" });
  },
  // 批量删除项目文件关联表，param.ids为逗号分割的id字符串
  removeBatchProjectFileRelation(param) {
    return axiosFn({ url: `/v1/projectFileRelation/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增项目文件关联表
  addBatchProjectFileRelation(param) {
    return axiosFn({ url: "/v1/projectFileRelation/batch/add", param, method: "post" });
  },
  /**
  * 调用现场图片-相关API
  */
  // 获取现场图片详情
  getPhotos(param) {
    return axiosFn({ url: `/v1/photos/${param.id}` });
  },
  // 查询单条现场图片
  findOnePhotos(param) {
    return axiosFn({ url: "/v1/photos/find/one", param });
  },
  // 获取现场图片列表
  queryPhotos(param) {
    return axiosFn({ url: "/v1/photos", param });
  },
  // 新增现场图片
  addPhotos(param) {
    return axiosFn({ url: "/v1/photos", param, method: "post" });
  },
  // 编辑现场图片
  editPhotos(param) {
    return axiosFn({ url: `/v1/photos/${param.id}`, param, method: "put" });
  },
  // 删除现场图片，param为map
  removePhotos(param) {
    return axiosFn({ url: "/v1/photos", param, method: "delete" });
  },
  // 批量删除现场图片，param.ids为逗号分割的id字符串
  removeBatchPhotos(param) {
    return axiosFn({ url: `/v1/photos/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增现场图片
  addBatchPhotos(param) {
    return axiosFn({ url: "/v1/photos/batch/add", param, method: "post" });
  },
  /**
  * 调用模版管理-相关API
  */
  // 获取模版管理详情
  getTemplateManagement(param) {
    return axiosFn({ url: `/v1/templateManagement/${param.id}` });
  },
  // 查询单条模版管理
  findOneTemplateManagement(param) {
    return axiosFn({ url: "/v1/templateManagement/find/one", param });
  },
  // 获取模版管理列表
  queryTemplateManagement(param) {
    return axiosFn({ url: "/v1/templateManagement", param });
  },
  // 新增模版管理
  addTemplateManagement(param) {
    return axiosFn({ url: "/v1/templateManagement", param, method: "post" });
  },
  // 编辑模版管理
  editTemplateManagement(param) {
    return axiosFn({ url: `/v1/templateManagement/${param.id}`, param, method: "put" });
  },
  // 删除模版管理，param为map
  removeTemplateManagement(param) {
    return axiosFn({ url: "/v1/templateManagement", param, method: "delete" });
  },
  // 批量删除模版管理，param.ids为逗号分割的id字符串
  removeBatchTemplateManagement(param) {
    return axiosFn({ url: `/v1/templateManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增模版管理
  addBatchTemplateManagement(param) {
    return axiosFn({ url: "/v1/templateManagement/batch/add", param, method: "post" });
  },
  /**
  * 调用检查整改情况-相关API
  */
  // 获取检查整改情况详情
  getSupervisionReport(param) {
    return axiosFn({ url: `/v1/supervisionReport/${param.id}` });
  },
  // 查询单条检查整改情况
  findOneSupervisionReport(param) {
    return axiosFn({ url: "/v1/supervisionReport/find/one", param });
  },
  // 获取检查整改情况列表
  querySupervisionReport(param) {
    return axiosFn({ url: "/v1/supervisionReport", param });
  },
  // 新增检查整改情况
  addSupervisionReport(param) {
    return axiosFn({ url: "/v1/supervisionReport", param, method: "post" });
  },
  // 编辑检查整改情况
  editSupervisionReport(param) {
    return axiosFn({ url: `/v1/supervisionReport/${param.id}`, param, method: "put" });
  },
  // 删除检查整改情况，param为map
  removeSupervisionReport(param) {
    return axiosFn({ url: "/v1/supervisionReport", param, method: "delete" });
  },
  // 批量删除检查整改情况，param.ids为逗号分割的id字符串
  removeBatchSupervisionReport(param) {
    return axiosFn({ url: `/v1/supervisionReport/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增检查整改情况
  addBatchSupervisionReport(param) {
    return axiosFn({ url: "/v1/supervisionReport/batch/add", param, method: "post" });
  },
  /**
  * 调用安全检查内容预制模板-相关API
  */
  // 获取安全检查内容预制模板详情
  getSafetyCheckTemplate(param) {
    return axiosFn({ url: `/v1/safetyCheckTemplate/${param.id}` });
  },
  // 查询单条安全检查内容预制模板
  findOneSafetyCheckTemplate(param) {
    return axiosFn({ url: "/v1/safetyCheckTemplate/find/one", param });
  },
  // 获取安全检查内容预制模板列表
  querySafetyCheckTemplate(param) {
    return axiosFn({ url: "/v1/safetyCheckTemplate", param });
  },
  // 新增安全检查内容预制模板
  addSafetyCheckTemplate(param) {
    return axiosFn({ url: "/v1/safetyCheckTemplate", param, method: "post" });
  },
  // 编辑安全检查内容预制模板
  editSafetyCheckTemplate(param) {
    return axiosFn({ url: `/v1/safetyCheckTemplate/${param.id}`, param, method: "put" });
  },
  // 删除安全检查内容预制模板，param为map
  removeSafetyCheckTemplate(param) {
    return axiosFn({ url: "/v1/safetyCheckTemplate", param, method: "delete" });
  },
  // 批量删除安全检查内容预制模板，param.ids为逗号分割的id字符串
  removeBatchSafetyCheckTemplate(param) {
    return axiosFn({ url: `/v1/safetyCheckTemplate/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增安全检查内容预制模板
  addBatchSafetyCheckTemplate(param) {
    return axiosFn({ url: "/v1/safetyCheckTemplate/batch/add", param, method: "post" });
  },
  /**
  * 调用投资管理-相关API
  */
  // 获取投资管理详情
  getInvestmentManagement(param) {
    return axiosFn({ url: `/v1/investmentManagement/${param.id}` });
  },
  // 查询单条投资管理
  findOneInvestmentManagement(param) {
    return axiosFn({ url: "/v1/investmentManagement/find/one", param });
  },
  // 获取投资管理列表
  queryInvestmentManagement(param) {
    return axiosFn({ url: "/v1/investmentManagement", param });
  },
  // 新增投资管理
  addInvestmentManagement(param) {
    return axiosFn({ url: "/v1/investmentManagement", param, method: "post" });
  },
  // 编辑投资管理
  editInvestmentManagement(param) {
    return axiosFn({ url: `/v1/investmentManagement/${param.id}`, param, method: "put" });
  },
  // 删除投资管理，param为map
  removeInvestmentManagement(param) {
    return axiosFn({ url: "/v1/investmentManagement", param, method: "delete" });
  },
  // 批量删除投资管理，param.ids为逗号分割的id字符串
  removeBatchInvestmentManagement(param) {
    return axiosFn({ url: `/v1/investmentManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增投资管理
  addBatchInvestmentManagement(param) {
    return axiosFn({ url: "/v1/investmentManagement/batch/add", param, method: "post" });
  },
  /**
  * 调用危险源管理-相关API
  */
  // 获取危险源管理详情
  getHazardManagement(param) {
    return axiosFn({ url: `/v1/hazardManagement/${param.id}` });
  },
  // 查询单条危险源管理
  findOneHazardManagement(param) {
    return axiosFn({ url: "/v1/hazardManagement/find/one", param });
  },
  // 获取危险源管理列表
  queryHazardManagement(param) {
    return axiosFn({ url: "/v1/hazardManagement", param });
  },
  // 新增危险源管理
  addHazardManagement(param) {
    return axiosFn({ url: "/v1/hazardManagement", param, method: "post" });
  },
  // 编辑危险源管理
  editHazardManagement(param) {
    return axiosFn({ url: `/v1/hazardManagement/${param.id}`, param, method: "put" });
  },
  // 删除危险源管理，param为map
  removeHazardManagement(param) {
    return axiosFn({ url: "/v1/hazardManagement", param, method: "delete" });
  },
  // 批量删除危险源管理，param.ids为逗号分割的id字符串
  removeBatchHazardManagement(param) {
    return axiosFn({ url: `/v1/hazardManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增危险源管理
  addBatchHazardManagement(param) {
    return axiosFn({ url: "/v1/hazardManagement/batch/add", param, method: "post" });
  },
  /**
  * 调用监理表格-批复表-相关API
  */
  // 获取监理表格-批复表详情
  getSupervisionFormReply(param) {
    return axiosFn({ url: `/v1/supervisionFormReply/${param.id}` });
  },
  // 查询单条监理表格-批复表
  findOneSupervisionFormReply(param) {
    return axiosFn({ url: "/v1/supervisionFormReply/find/one", param });
  },
  // 获取监理表格-批复表列表
  querySupervisionFormReply(param) {
    return axiosFn({ url: "/v1/supervisionFormReply", param });
  },
  // 新增监理表格-批复表
  addSupervisionFormReply(param) {
    return axiosFn({ url: "/v1/supervisionFormReply", param, method: "post" });
  },
  // 编辑监理表格-批复表
  editSupervisionFormReply(param) {
    return axiosFn({ url: `/v1/supervisionFormReply/${param.id}`, param, method: "put" });
  },
  // 删除监理表格-批复表，param为map
  removeSupervisionFormReply(param) {
    return axiosFn({ url: "/v1/supervisionFormReply", param, method: "delete" });
  },
  // 批量删除监理表格-批复表，param.ids为逗号分割的id字符串
  removeBatchSupervisionFormReply(param) {
    return axiosFn({ url: `/v1/supervisionFormReply/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增监理表格-批复表
  addBatchSupervisionFormReply(param) {
    return axiosFn({ url: "/v1/supervisionFormReply/batch/add", param, method: "post" });
  },
  /**
  * 调用监理表格--会议纪要-相关API
  */
  // 获取监理表格--会议纪要详情
  getMeetingMinutesManual(param) {
    return axiosFn({ url: `/v1/meetingMinutesManual/${param.id}` });
  },
  // 查询单条监理表格--会议纪要
  findOneMeetingMinutesManual(param) {
    return axiosFn({ url: "/v1/meetingMinutesManual/find/one", param });
  },
  // 获取监理表格--会议纪要列表
  queryMeetingMinutesManual(param) {
    return axiosFn({ url: "/v1/meetingMinutesManual", param });
  },
  // 新增监理表格--会议纪要
  addMeetingMinutesManual(param) {
    return axiosFn({ url: "/v1/meetingMinutesManual", param, method: "post" });
  },
  // 编辑监理表格--会议纪要
  editMeetingMinutesManual(param) {
    return axiosFn({ url: `/v1/meetingMinutesManual/${param.id}`, param, method: "put" });
  },
  // 删除监理表格--会议纪要，param为map
  removeMeetingMinutesManual(param) {
    return axiosFn({ url: "/v1/meetingMinutesManual", param, method: "delete" });
  },
  // 批量删除监理表格--会议纪要，param.ids为逗号分割的id字符串
  removeBatchMeetingMinutesManual(param) {
    return axiosFn({ url: `/v1/meetingMinutesManual/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增监理表格--会议纪要
  addBatchMeetingMinutesManual(param) {
    return axiosFn({ url: "/v1/meetingMinutesManual/batch/add", param, method: "post" });
  },
  /**
  * 调用隐患排查-相关API
  */
  // 获取隐患排查详情
  getHazardInspection(param) {
    return axiosFn({ url: `/v1/hazardInspection/${param.id}` });
  },
  // 查询单条隐患排查
  findOneHazardInspection(param) {
    return axiosFn({ url: "/v1/hazardInspection/find/one", param });
  },
  // 获取隐患排查列表
  queryHazardInspection(param) {
    return axiosFn({ url: "/v1/hazardInspection", param });
  },
  // 新增隐患排查
  addHazardInspection(param) {
    return axiosFn({ url: "/v1/hazardInspection", param, method: "post" });
  },
  // 编辑隐患排查
  editHazardInspection(param) {
    return axiosFn({ url: `/v1/hazardInspection/${param.id}`, param, method: "put" });
  },
  // 删除隐患排查，param为map
  removeHazardInspection(param) {
    return axiosFn({ url: "/v1/hazardInspection", param, method: "delete" });
  },
  // 批量删除隐患排查，param.ids为逗号分割的id字符串
  removeBatchHazardInspection(param) {
    return axiosFn({ url: `/v1/hazardInspection/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增隐患排查
  addBatchHazardInspection(param) {
    return axiosFn({ url: "/v1/hazardInspection/batch/add", param, method: "post" });
  },
  /**
  * 调用内部培训计划-相关API
  */
  // 获取内部培训计划详情
  getLnternalTrainingProgram(param) {
    return axiosFn({ url: `/v1/lnternalTrainingProgram/${param.id}` });
  },
  // 查询单条内部培训计划
  findOneLnternalTrainingProgram(param) {
    return axiosFn({ url: "/v1/lnternalTrainingProgram/find/one", param });
  },
  // 获取内部培训计划列表
  queryLnternalTrainingProgram(param) {
    return axiosFn({ url: "/v1/lnternalTrainingProgram", param });
  },
  // 新增内部培训计划
  addLnternalTrainingProgram(param) {
    return axiosFn({ url: "/v1/lnternalTrainingProgram", param, method: "post" });
  },
  // 编辑内部培训计划
  editLnternalTrainingProgram(param) {
    return axiosFn({ url: `/v1/lnternalTrainingProgram/${param.id}`, param, method: "put" });
  },
  // 删除内部培训计划，param为map
  removeLnternalTrainingProgram(param) {
    return axiosFn({ url: "/v1/lnternalTrainingProgram", param, method: "delete" });
  },
  // 批量删除内部培训计划，param.ids为逗号分割的id字符串
  removeBatchLnternalTrainingProgram(param) {
    return axiosFn({ url: `/v1/lnternalTrainingProgram/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增内部培训计划
  addBatchLnternalTrainingProgram(param) {
    return axiosFn({ url: "/v1/lnternalTrainingProgram/batch/add", param, method: "post" });
  },
  /**
  * 调用平行检测报告-相关API
  */
  // 获取平行检测报告详情
  getParallelReport(param) {
    return axiosFn({ url: `/v1/parallelReport/${param.id}` });
  },
  // 查询单条平行检测报告
  findOneParallelReport(param) {
    return axiosFn({ url: "/v1/parallelReport/find/one", param });
  },
  // 获取平行检测报告列表
  queryParallelReport(param) {
    return axiosFn({ url: "/v1/parallelReport", param });
  },
  // 新增平行检测报告
  addParallelReport(param) {
    return axiosFn({ url: "/v1/parallelReport", param, method: "post" });
  },
  // 编辑平行检测报告
  editParallelReport(param) {
    return axiosFn({ url: `/v1/parallelReport/${param.id}`, param, method: "put" });
  },
  // 删除平行检测报告，param为map
  removeParallelReport(param) {
    return axiosFn({ url: "/v1/parallelReport", param, method: "delete" });
  },
  // 批量删除平行检测报告，param.ids为逗号分割的id字符串
  removeBatchParallelReport(param) {
    return axiosFn({ url: `/v1/parallelReport/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增平行检测报告
  addBatchParallelReport(param) {
    return axiosFn({ url: "/v1/parallelReport/batch/add", param, method: "post" });
  },
  /**
  * 调用安全检查表-相关API
  */
  // 获取安全检查表详情
  getSecurityChecklist(param) {
    return axiosFn({ url: `/v1/securityChecklist/${param.id}` });
  },
  // 查询单条安全检查表
  findOneSecurityChecklist(param) {
    return axiosFn({ url: "/v1/securityChecklist/find/one", param });
  },
  // 获取安全检查表列表
  querySecurityChecklist(param) {
    return axiosFn({ url: "/v1/securityChecklist", param });
  },
  // 新增安全检查表
  addSecurityChecklist(param) {
    return axiosFn({ url: "/v1/securityChecklist", param, method: "post" });
  },
  // 编辑安全检查表
  editSecurityChecklist(param) {
    return axiosFn({ url: `/v1/securityChecklist/${param.id}`, param, method: "put" });
  },
  // 删除安全检查表，param为map
  removeSecurityChecklist(param) {
    return axiosFn({ url: "/v1/securityChecklist", param, method: "delete" });
  },
  // 批量删除安全检查表，param.ids为逗号分割的id字符串
  removeBatchSecurityChecklist(param) {
    return axiosFn({ url: `/v1/securityChecklist/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增安全检查表
  addBatchSecurityChecklist(param) {
    return axiosFn({ url: "/v1/securityChecklist/batch/add", param, method: "post" });
  },
  /**
  * 调用安全方案-相关API
  */
  // 获取安全方案详情
  getSecurityPlan(param) {
    return axiosFn({ url: `/v1/securityPlan/${param.id}` });
  },
  // 查询单条安全方案
  findOneSecurityPlan(param) {
    return axiosFn({ url: "/v1/securityPlan/find/one", param });
  },
  // 获取安全方案列表
  querySecurityPlan(param) {
    return axiosFn({ url: "/v1/securityPlan", param });
  },
  // 新增安全方案
  addSecurityPlan(param) {
    return axiosFn({ url: "/v1/securityPlan", param, method: "post" });
  },
  // 编辑安全方案
  editSecurityPlan(param) {
    return axiosFn({ url: `/v1/securityPlan/${param.id}`, param, method: "put" });
  },
  // 删除安全方案，param为map
  removeSecurityPlan(param) {
    return axiosFn({ url: "/v1/securityPlan", param, method: "delete" });
  },
  // 批量删除安全方案，param.ids为逗号分割的id字符串
  removeBatchSecurityPlan(param) {
    return axiosFn({ url: `/v1/securityPlan/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增安全方案
  addBatchSecurityPlan(param) {
    return axiosFn({ url: "/v1/securityPlan/batch/add", param, method: "post" });
  },
  /**
  * 调用特种人管理-相关API
  */
  // 获取特种人管理详情
  getSpecialPersonnelManagement(param) {
    return axiosFn({ url: `/v1/specialPersonnelManagement/${param.id}` });
  },
  // 查询单条特种人管理
  findOneSpecialPersonnelManagement(param) {
    return axiosFn({ url: "/v1/specialPersonnelManagement/find/one", param });
  },
  // 获取特种人管理列表
  querySpecialPersonnelManagement(param) {
    return axiosFn({ url: "/v1/specialPersonnelManagement", param });
  },
  // 新增特种人管理
  addSpecialPersonnelManagement(param) {
    return axiosFn({ url: "/v1/specialPersonnelManagement", param, method: "post" });
  },
  // 编辑特种人管理
  editSpecialPersonnelManagement(param) {
    return axiosFn({ url: `/v1/specialPersonnelManagement/${param.id}`, param, method: "put" });
  },
  // 删除特种人管理，param为map
  removeSpecialPersonnelManagement(param) {
    return axiosFn({ url: "/v1/specialPersonnelManagement", param, method: "delete" });
  },
  // 批量删除特种人管理，param.ids为逗号分割的id字符串
  removeBatchSpecialPersonnelManagement(param) {
    return axiosFn({ url: `/v1/specialPersonnelManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增特种人管理
  addBatchSpecialPersonnelManagement(param) {
    return axiosFn({ url: "/v1/specialPersonnelManagement/batch/add", param, method: "post" });
  },
  /**
  * 调用变更管理-相关API
  */
  // 获取变更管理详情
  getChangeManagement(param) {
    return axiosFn({ url: `/v1/changeManagement/${param.id}` });
  },
  // 查询单条变更管理
  findOneChangeManagement(param) {
    return axiosFn({ url: "/v1/changeManagement/find/one", param });
  },
  // 获取变更管理列表
  queryChangeManagement(param) {
    return axiosFn({ url: "/v1/changeManagement", param });
  },
  // 新增变更管理
  addChangeManagement(param) {
    return axiosFn({ url: "/v1/changeManagement", param, method: "post" });
  },
  // 编辑变更管理
  editChangeManagement(param) {
    return axiosFn({ url: `/v1/changeManagement/${param.id}`, param, method: "put" });
  },
  // 删除变更管理，param为map
  removeChangeManagement(param) {
    return axiosFn({ url: "/v1/changeManagement", param, method: "delete" });
  },
  // 批量删除变更管理，param.ids为逗号分割的id字符串
  removeBatchChangeManagement(param) {
    return axiosFn({ url: `/v1/changeManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增变更管理
  addBatchChangeManagement(param) {
    return axiosFn({ url: "/v1/changeManagement/batch/add", param, method: "post" });
  },
  /**
  * 调用监理表格--监理通知-相关API
  */
  // 获取监理表格--监理通知详情
  getSupervisionNotice(param) {
    return axiosFn({ url: `/v1/supervisionNotice/${param.id}` });
  },
  // 查询单条监理表格--监理通知
  findOneSupervisionNotice(param) {
    return axiosFn({ url: "/v1/supervisionNotice/find/one", param });
  },
  // 获取监理表格--监理通知列表
  querySupervisionNotice(param) {
    return axiosFn({ url: "/v1/supervisionNotice", param });
  },
  // 新增监理表格--监理通知
  addSupervisionNotice(param) {
    return axiosFn({ url: "/v1/supervisionNotice", param, method: "post" });
  },
  // 编辑监理表格--监理通知
  editSupervisionNotice(param) {
    return axiosFn({ url: `/v1/supervisionNotice/${param.id}`, param, method: "put" });
  },
  // 删除监理表格--监理通知，param为map
  removeSupervisionNotice(param) {
    return axiosFn({ url: "/v1/supervisionNotice", param, method: "delete" });
  },
  // 批量删除监理表格--监理通知，param.ids为逗号分割的id字符串
  removeBatchSupervisionNotice(param) {
    return axiosFn({ url: `/v1/supervisionNotice/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增监理表格--监理通知
  addBatchSupervisionNotice(param) {
    return axiosFn({ url: "/v1/supervisionNotice/batch/add", param, method: "post" });
  },
  /**
  * 调用监理细则管理-相关API
  */
  // 获取监理细则管理详情
  getSupervisionDetailManagement(param) {
    return axiosFn({ url: `/v1/supervisionDetailManagement/${param.id}` });
  },
  // 查询单条监理细则管理
  findOneSupervisionDetailManagement(param) {
    return axiosFn({ url: "/v1/supervisionDetailManagement/find/one", param });
  },
  // 获取监理细则管理列表
  querySupervisionDetailManagement(param) {
    return axiosFn({ url: "/v1/supervisionDetailManagement", param });
  },
  // 新增监理细则管理
  addSupervisionDetailManagement(param) {
    return axiosFn({ url: "/v1/supervisionDetailManagement", param, method: "post" });
  },
  // 编辑监理细则管理
  editSupervisionDetailManagement(param) {
    return axiosFn({ url: `/v1/supervisionDetailManagement/${param.id}`, param, method: "put" });
  },
  // 删除监理细则管理，param为map
  removeSupervisionDetailManagement(param) {
    return axiosFn({ url: "/v1/supervisionDetailManagement", param, method: "delete" });
  },
  // 批量删除监理细则管理，param.ids为逗号分割的id字符串
  removeBatchSupervisionDetailManagement(param) {
    return axiosFn({ url: `/v1/supervisionDetailManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增监理细则管理
  addBatchSupervisionDetailManagement(param) {
    return axiosFn({ url: "/v1/supervisionDetailManagement/batch/add", param, method: "post" });
  },
  /**
  * 调用监理规划-相关API
  */
  // 获取监理规划详情
  getSupervisionPlan(param) {
    return axiosFn({ url: `/v1/supervisionPlan/${param.id}` });
  },
  // 查询单条监理规划
  findOneSupervisionPlan(param) {
    return axiosFn({ url: "/v1/supervisionPlan/find/one", param });
  },
  // 获取监理规划列表
  querySupervisionPlan(param) {
    return axiosFn({ url: "/v1/supervisionPlan", param });
  },
  // 新增监理规划
  addSupervisionPlan(param) {
    return axiosFn({ url: "/v1/supervisionPlan", param, method: "post" });
  },
  // 编辑监理规划
  editSupervisionPlan(param) {
    return axiosFn({ url: `/v1/supervisionPlan/${param.id}`, param, method: "put" });
  },
  // 删除监理规划，param为map
  removeSupervisionPlan(param) {
    return axiosFn({ url: "/v1/supervisionPlan", param, method: "delete" });
  },
  // 批量删除监理规划，param.ids为逗号分割的id字符串
  removeBatchSupervisionPlan(param) {
    return axiosFn({ url: `/v1/supervisionPlan/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增监理规划
  addBatchSupervisionPlan(param) {
    return axiosFn({ url: "/v1/supervisionPlan/batch/add", param, method: "post" });
  },
  /**
  * 调用稽查检测清单-相关API
  */
  // 获取稽查检测清单详情
  getInspectionChecklist(param) {
    return axiosFn({ url: `/v1/inspectionChecklist/${param.id}` });
  },
  // 查询单条稽查检测清单
  findOneInspectionChecklist(param) {
    return axiosFn({ url: "/v1/inspectionChecklist/find/one", param });
  },
  // 获取稽查检测清单列表
  queryInspectionChecklist(param) {
    return axiosFn({ url: "/v1/inspectionChecklist", param });
  },
  // 新增稽查检测清单
  addInspectionChecklist(param) {
    return axiosFn({ url: "/v1/inspectionChecklist", param, method: "post" });
  },
  // 编辑稽查检测清单
  editInspectionChecklist(param) {
    return axiosFn({ url: `/v1/inspectionChecklist/${param.id}`, param, method: "put" });
  },
  // 删除稽查检测清单，param为map
  removeInspectionChecklist(param) {
    return axiosFn({ url: "/v1/inspectionChecklist", param, method: "delete" });
  },
  // 批量删除稽查检测清单，param.ids为逗号分割的id字符串
  removeBatchInspectionChecklist(param) {
    return axiosFn({ url: `/v1/inspectionChecklist/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增稽查检测清单
  addBatchInspectionChecklist(param) {
    return axiosFn({ url: "/v1/inspectionChecklist/batch/add", param, method: "post" });
  },
  /**
  * 调用公司检查计划-相关API
  */
  // 获取公司检查计划详情
  getCompanyCheckPlan(param) {
    return axiosFn({ url: `/v1/companyCheckPlan/${param.id}` });
  },
  // 查询单条公司检查计划
  findOneCompanyCheckPlan(param) {
    return axiosFn({ url: "/v1/companyCheckPlan/find/one", param });
  },
  // 获取公司检查计划列表
  queryCompanyCheckPlan(param) {
    return axiosFn({ url: "/v1/companyCheckPlan", param });
  },
  // 新增公司检查计划
  addCompanyCheckPlan(param) {
    return axiosFn({ url: "/v1/companyCheckPlan", param, method: "post" });
  },
  // 编辑公司检查计划
  editCompanyCheckPlan(param) {
    return axiosFn({ url: `/v1/companyCheckPlan/${param.id}`, param, method: "put" });
  },
  // 删除公司检查计划，param为map
  removeCompanyCheckPlan(param) {
    return axiosFn({ url: "/v1/companyCheckPlan", param, method: "delete" });
  },
  // 批量删除公司检查计划，param.ids为逗号分割的id字符串
  removeBatchCompanyCheckPlan(param) {
    return axiosFn({ url: `/v1/companyCheckPlan/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增公司检查计划
  addBatchCompanyCheckPlan(param) {
    return axiosFn({ url: "/v1/companyCheckPlan/batch/add", param, method: "post" });
  },
  /**
  * 调用稽查清单说明-相关API
  */
  // 获取稽查清单说明详情
  getInspectionListDescription(param) {
    return axiosFn({ url: `/v1/inspectionListDescription/${param.id}` });
  },
  // 查询单条稽查清单说明
  findOneInspectionListDescription(param) {
    return axiosFn({ url: "/v1/inspectionListDescription/find/one", param });
  },
  // 获取稽查清单说明列表
  queryInspectionListDescription(param) {
    return axiosFn({ url: "/v1/inspectionListDescription", param });
  },
  // 新增稽查清单说明
  addInspectionListDescription(param) {
    return axiosFn({ url: "/v1/inspectionListDescription", param, method: "post" });
  },
  // 编辑稽查清单说明
  editInspectionListDescription(param) {
    return axiosFn({ url: `/v1/inspectionListDescription/${param.id}`, param, method: "put" });
  },
  // 删除稽查清单说明，param为map
  removeInspectionListDescription(param) {
    return axiosFn({ url: "/v1/inspectionListDescription", param, method: "delete" });
  },
  // 批量删除稽查清单说明，param.ids为逗号分割的id字符串
  removeBatchInspectionListDescription(param) {
    return axiosFn({ url: `/v1/inspectionListDescription/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增稽查清单说明
  addBatchInspectionListDescription(param) {
    return axiosFn({ url: "/v1/inspectionListDescription/batch/add", param, method: "post" });
  },
  /**
  * 调用工程管理-相关API
  */
  // 获取工程管理详情
  getManagement(param) {
    return axiosFn({ url: `/v1/management/${param.id}` });
  },
  // 查询单条工程管理
  findOneManagement(param) {
    return axiosFn({ url: "/v1/management/find/one", param });
  },
  // 获取工程管理列表
  queryManagement(param) {
    return axiosFn({ url: "/v1/management", param });
  },
  // 新增工程管理
  addManagement(param) {
    return axiosFn({ url: "/v1/management", param, method: "post" });
  },
  // 编辑工程管理
  editManagement(param) {
    return axiosFn({ url: `/v1/management/${param.id}`, param, method: "put" });
  },
  // 删除工程管理，param为map
  removeManagement(param) {
    return axiosFn({ url: "/v1/management", param, method: "delete" });
  },
  // 批量删除工程管理，param.ids为逗号分割的id字符串
  removeBatchManagement(param) {
    return axiosFn({ url: `/v1/management/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增工程管理
  addBatchManagement(param) {
    return axiosFn({ url: "/v1/management/batch/add", param, method: "post" });
  },
  /**
  * 调用安全演练培训记录管理-相关API
  */
  // 获取安全演练培训记录管理详情
  getSafetyDrillTrainingRecordManagement(param) {
    return axiosFn({ url: `/v1/safetyDrillTrainingRecordManagement/${param.id}` });
  },
  // 查询单条安全演练培训记录管理
  findOneSafetyDrillTrainingRecordManagement(param) {
    return axiosFn({ url: "/v1/safetyDrillTrainingRecordManagement/find/one", param });
  },
  // 获取安全演练培训记录管理列表
  querySafetyDrillTrainingRecordManagement(param) {
    return axiosFn({ url: "/v1/safetyDrillTrainingRecordManagement", param });
  },
  // 新增安全演练培训记录管理
  addSafetyDrillTrainingRecordManagement(param) {
    return axiosFn({ url: "/v1/safetyDrillTrainingRecordManagement", param, method: "post" });
  },
  // 编辑安全演练培训记录管理
  editSafetyDrillTrainingRecordManagement(param) {
    return axiosFn({ url: `/v1/safetyDrillTrainingRecordManagement/${param.id}`, param, method: "put" });
  },
  // 删除安全演练培训记录管理，param为map
  removeSafetyDrillTrainingRecordManagement(param) {
    return axiosFn({ url: "/v1/safetyDrillTrainingRecordManagement", param, method: "delete" });
  },
  // 批量删除安全演练培训记录管理，param.ids为逗号分割的id字符串
  removeBatchSafetyDrillTrainingRecordManagement(param) {
    return axiosFn({ url: `/v1/safetyDrillTrainingRecordManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增安全演练培训记录管理
  addBatchSafetyDrillTrainingRecordManagement(param) {
    return axiosFn({ url: "/v1/safetyDrillTrainingRecordManagement/batch/add", param, method: "post" });
  },
  /**
  * 调用内部培训记录-相关API
  */
  // 获取内部培训记录详情
  getInternalTrainingRecord(param) {
    return axiosFn({ url: `/v1/internalTrainingRecord/${param.id}` });
  },
  // 查询单条内部培训记录
  findOneInternalTrainingRecord(param) {
    return axiosFn({ url: "/v1/internalTrainingRecord/find/one", param });
  },
  // 获取内部培训记录列表
  queryInternalTrainingRecord(param) {
    return axiosFn({ url: "/v1/internalTrainingRecord", param });
  },
  // 新增内部培训记录
  addInternalTrainingRecord(param) {
    return axiosFn({ url: "/v1/internalTrainingRecord", param, method: "post" });
  },
  // 编辑内部培训记录
  editInternalTrainingRecord(param) {
    return axiosFn({ url: `/v1/internalTrainingRecord/${param.id}`, param, method: "put" });
  },
  // 删除内部培训记录，param为map
  removeInternalTrainingRecord(param) {
    return axiosFn({ url: "/v1/internalTrainingRecord", param, method: "delete" });
  },
  // 批量删除内部培训记录，param.ids为逗号分割的id字符串
  removeBatchInternalTrainingRecord(param) {
    return axiosFn({ url: `/v1/internalTrainingRecord/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增内部培训记录
  addBatchInternalTrainingRecord(param) {
    return axiosFn({ url: "/v1/internalTrainingRecord/batch/add", param, method: "post" });
  },
  /**
  * 调用成员管理-相关API
  */
  // 获取成员管理详情
  getMemberManagement(param) {
    return axiosFn({ url: `/v1/memberManagement/${param.id}` });
  },
  // 查询单条成员管理
  findOneMemberManagement(param) {
    return axiosFn({ url: "/v1/memberManagement/find/one", param });
  },
  // 获取成员管理列表
  queryMemberManagement(param) {
    return axiosFn({ url: "/v1/memberManagement", param });
  },
  // 新增成员管理
  addMemberManagement(param) {
    return axiosFn({ url: "/v1/memberManagement", param, method: "post" });
  },
  // 编辑成员管理
  editMemberManagement(param) {
    return axiosFn({ url: `/v1/memberManagement/${param.id}`, param, method: "put" });
  },
  // 删除成员管理，param为map
  removeMemberManagement(param) {
    return axiosFn({ url: "/v1/memberManagement", param, method: "delete" });
  },
  // 批量删除成员管理，param.ids为逗号分割的id字符串
  removeBatchMemberManagement(param) {
    return axiosFn({ url: `/v1/memberManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增成员管理
  addBatchMemberManagement(param) {
    return axiosFn({ url: "/v1/memberManagement/batch/add", param, method: "post" });
  },
  /**
  * 调用标段信息-相关API
  */
  // 获取标段信息详情
  getSectionInfo(param) {
    return axiosFn({ url: `/v1/sectionInfo/${param.id}` });
  },
  // 查询单条标段信息
  findOneSectionInfo(param) {
    return axiosFn({ url: "/v1/sectionInfo/find/one", param });
  },
  // 获取标段信息列表
  querySectionInfo(param) {
    return axiosFn({ url: "/v1/sectionInfo", param });
  },
  // 新增标段信息
  addSectionInfo(param) {
    return axiosFn({ url: "/v1/sectionInfo", param, method: "post" });
  },
  // 编辑标段信息
  editSectionInfo(param) {
    return axiosFn({ url: `/v1/sectionInfo/${param.id}`, param, method: "put" });
  },
  // 删除标段信息，param为map
  removeSectionInfo(param) {
    return axiosFn({ url: "/v1/sectionInfo", param, method: "delete" });
  },
  // 批量删除标段信息，param.ids为逗号分割的id字符串
  removeBatchSectionInfo(param) {
    return axiosFn({ url: `/v1/sectionInfo/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增标段信息
  addBatchSectionInfo(param) {
    return axiosFn({ url: "/v1/sectionInfo/batch/add", param, method: "post" });
  },
  /**
  * 调用待办事项-相关API
  */
  // 获取待办事项详情
  getTodoList(param) {
    return axiosFn({ url: `/v1/todoList/${param.id}` });
  },
  // 查询单条待办事项
  findOneTodoList(param) {
    return axiosFn({ url: "/v1/todoList/find/one", param });
  },
  // 获取待办事项列表
  queryTodoList(param) {
    return axiosFn({ url: "/v1/todoList", param });
  },
  // 新增待办事项
  addTodoList(param) {
    return axiosFn({ url: "/v1/todoList", param, method: "post" });
  },
  // 编辑待办事项
  editTodoList(param) {
    return axiosFn({ url: `/v1/todoList/${param.id}`, param, method: "put" });
  },
  // 删除待办事项，param为map
  removeTodoList(param) {
    return axiosFn({ url: "/v1/todoList", param, method: "delete" });
  },
  // 批量删除待办事项，param.ids为逗号分割的id字符串
  removeBatchTodoList(param) {
    return axiosFn({ url: `/v1/todoList/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增待办事项
  addBatchTodoList(param) {
    return axiosFn({ url: "/v1/todoList/batch/add", param, method: "post" });
  },
  /**
  * 调用会议纪要--用户上传-相关API
  */
  // 获取会议纪要--用户上传详情
  getMeetingMinutesUploadFile(param) {
    return axiosFn({ url: `/v1/meetingMinutesUploadFile/${param.id}` });
  },
  // 查询单条会议纪要--用户上传
  findOneMeetingMinutesUploadFile(param) {
    return axiosFn({ url: "/v1/meetingMinutesUploadFile/find/one", param });
  },
  // 获取会议纪要--用户上传列表
  queryMeetingMinutesUploadFile(param) {
    return axiosFn({ url: "/v1/meetingMinutesUploadFile", param });
  },
  // 新增会议纪要--用户上传
  addMeetingMinutesUploadFile(param) {
    return axiosFn({ url: "/v1/meetingMinutesUploadFile", param, method: "post" });
  },
  // 编辑会议纪要--用户上传
  editMeetingMinutesUploadFile(param) {
    return axiosFn({ url: `/v1/meetingMinutesUploadFile/${param.id}`, param, method: "put" });
  },
  // 删除会议纪要--用户上传，param为map
  removeMeetingMinutesUploadFile(param) {
    return axiosFn({ url: "/v1/meetingMinutesUploadFile", param, method: "delete" });
  },
  // 批量删除会议纪要--用户上传，param.ids为逗号分割的id字符串
  removeBatchMeetingMinutesUploadFile(param) {
    return axiosFn({ url: `/v1/meetingMinutesUploadFile/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增会议纪要--用户上传
  addBatchMeetingMinutesUploadFile(param) {
    return axiosFn({ url: "/v1/meetingMinutesUploadFile/batch/add", param, method: "post" });
  },
  /**
  * 调用监理月报管理-相关API
  */
  // 获取监理月报管理详情
  getSupervisionMonthlyReport(param) {
    return axiosFn({ url: `/v1/supervisionMonthlyReport/${param.id}` });
  },
  // 查询单条监理月报管理
  findOneSupervisionMonthlyReport(param) {
    return axiosFn({ url: "/v1/supervisionMonthlyReport/find/one", param });
  },
  // 获取监理月报管理列表
  querySupervisionMonthlyReport(param) {
    return axiosFn({ url: "/v1/supervisionMonthlyReport", param });
  },
  // 新增监理月报管理
  addSupervisionMonthlyReport(param) {
    return axiosFn({ url: "/v1/supervisionMonthlyReport", param, method: "post" });
  },
  // 编辑监理月报管理
  editSupervisionMonthlyReport(param) {
    return axiosFn({ url: `/v1/supervisionMonthlyReport/${param.id}`, param, method: "put" });
  },
  // 删除监理月报管理，param为map
  removeSupervisionMonthlyReport(param) {
    return axiosFn({ url: "/v1/supervisionMonthlyReport", param, method: "delete" });
  },
  // 批量删除监理月报管理，param.ids为逗号分割的id字符串
  removeBatchSupervisionMonthlyReport(param) {
    return axiosFn({ url: `/v1/supervisionMonthlyReport/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增监理月报管理
  addBatchSupervisionMonthlyReport(param) {
    return axiosFn({ url: "/v1/supervisionMonthlyReport/batch/add", param, method: "post" });
  },
  /**
  * 调用监理日志管理-相关API
  */
  // 获取监理日志管理详情
  getSupervisionLogManagement(param) {
    return axiosFn({ url: `/v1/supervisionLogManagement/${param.id}` });
  },
  // 查询单条监理日志管理
  findOneSupervisionLogManagement(param) {
    return axiosFn({ url: "/v1/supervisionLogManagement/find/one", param });
  },
  // 获取监理日志管理列表
  querySupervisionLogManagement(param) {
    return axiosFn({ url: "/v1/supervisionLogManagement", param });
  },
  // 新增监理日志管理
  addSupervisionLogManagement(param) {
    return axiosFn({ url: "/v1/supervisionLogManagement", param, method: "post" });
  },
  // 编辑监理日志管理
  editSupervisionLogManagement(param) {
    return axiosFn({ url: `/v1/supervisionLogManagement/${param.id}`, param, method: "put" });
  },
  // 删除监理日志管理，param为map
  removeSupervisionLogManagement(param) {
    return axiosFn({ url: "/v1/supervisionLogManagement", param, method: "delete" });
  },
  // 批量删除监理日志管理，param.ids为逗号分割的id字符串
  removeBatchSupervisionLogManagement(param) {
    return axiosFn({ url: `/v1/supervisionLogManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增监理日志管理
  addBatchSupervisionLogManagement(param) {
    return axiosFn({ url: "/v1/supervisionLogManagement/batch/add", param, method: "post" });
  },
  /**
  * 调用违约管理-相关API
  */
  // 获取违约管理详情
  getDefaultManagement(param) {
    return axiosFn({ url: `/v1/defaultManagement/${param.id}` });
  },
  // 查询单条违约管理
  findOneDefaultManagement(param) {
    return axiosFn({ url: "/v1/defaultManagement/find/one", param });
  },
  // 获取违约管理列表
  queryDefaultManagement(param) {
    return axiosFn({ url: "/v1/defaultManagement", param });
  },
  // 新增违约管理
  addDefaultManagement(param) {
    return axiosFn({ url: "/v1/defaultManagement", param, method: "post" });
  },
  // 编辑违约管理
  editDefaultManagement(param) {
    return axiosFn({ url: `/v1/defaultManagement/${param.id}`, param, method: "put" });
  },
  // 删除违约管理，param为map
  removeDefaultManagement(param) {
    return axiosFn({ url: "/v1/defaultManagement", param, method: "delete" });
  },
  // 批量删除违约管理，param.ids为逗号分割的id字符串
  removeBatchDefaultManagement(param) {
    return axiosFn({ url: `/v1/defaultManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增违约管理
  addBatchDefaultManagement(param) {
    return axiosFn({ url: "/v1/defaultManagement/batch/add", param, method: "post" });
  },
  /**
  * 调用监理工作报告管理-相关API
  */
  // 获取监理工作报告管理详情
  getSupervisionReportManagement(param) {
    return axiosFn({ url: `/v1/supervisionReportManagement/${param.id}` });
  },
  // 查询单条监理工作报告管理
  findOneSupervisionReportManagement(param) {
    return axiosFn({ url: "/v1/supervisionReportManagement/find/one", param });
  },
  // 获取监理工作报告管理列表
  querySupervisionReportManagement(param) {
    return axiosFn({ url: "/v1/supervisionReportManagement", param });
  },
  // 新增监理工作报告管理
  addSupervisionReportManagement(param) {
    return axiosFn({ url: "/v1/supervisionReportManagement", param, method: "post" });
  },
  // 编辑监理工作报告管理
  editSupervisionReportManagement(param) {
    return axiosFn({ url: `/v1/supervisionReportManagement/${param.id}`, param, method: "put" });
  },
  // 删除监理工作报告管理，param为map
  removeSupervisionReportManagement(param) {
    return axiosFn({ url: "/v1/supervisionReportManagement", param, method: "delete" });
  },
  // 批量删除监理工作报告管理，param.ids为逗号分割的id字符串
  removeBatchSupervisionReportManagement(param) {
    return axiosFn({ url: `/v1/supervisionReportManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增监理工作报告管理
  addBatchSupervisionReportManagement(param) {
    return axiosFn({ url: "/v1/supervisionReportManagement/batch/add", param, method: "post" });
  },
  /**
  * 调用鉴定书管理-相关API
  */
  // 获取鉴定书管理详情
  getCertificateManagement(param) {
    return axiosFn({ url: `/v1/certificateManagement/${param.id}` });
  },
  // 查询单条鉴定书管理
  findOneCertificateManagement(param) {
    return axiosFn({ url: "/v1/certificateManagement/find/one", param });
  },
  // 获取鉴定书管理列表
  queryCertificateManagement(param) {
    return axiosFn({ url: "/v1/certificateManagement", param });
  },
  // 新增鉴定书管理
  addCertificateManagement(param) {
    return axiosFn({ url: "/v1/certificateManagement", param, method: "post" });
  },
  // 编辑鉴定书管理
  editCertificateManagement(param) {
    return axiosFn({ url: `/v1/certificateManagement/${param.id}`, param, method: "put" });
  },
  // 删除鉴定书管理，param为map
  removeCertificateManagement(param) {
    return axiosFn({ url: "/v1/certificateManagement", param, method: "delete" });
  },
  // 批量删除鉴定书管理，param.ids为逗号分割的id字符串
  removeBatchCertificateManagement(param) {
    return axiosFn({ url: `/v1/certificateManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增鉴定书管理
  addBatchCertificateManagement(param) {
    return axiosFn({ url: "/v1/certificateManagement/batch/add", param, method: "post" });
  },
  /**
  * 调用应急管理-相关API
  */
  // 获取应急管理详情
  getEmergencyManagement(param) {
    return axiosFn({ url: `/v1/emergencyManagement/${param.id}` });
  },
  // 查询单条应急管理
  findOneEmergencyManagement(param) {
    return axiosFn({ url: "/v1/emergencyManagement/find/one", param });
  },
  // 获取应急管理列表
  queryEmergencyManagement(param) {
    return axiosFn({ url: "/v1/emergencyManagement", param });
  },
  // 新增应急管理
  addEmergencyManagement(param) {
    return axiosFn({ url: "/v1/emergencyManagement", param, method: "post" });
  },
  // 编辑应急管理
  editEmergencyManagement(param) {
    return axiosFn({ url: `/v1/emergencyManagement/${param.id}`, param, method: "put" });
  },
  // 删除应急管理，param为map
  removeEmergencyManagement(param) {
    return axiosFn({ url: "/v1/emergencyManagement", param, method: "delete" });
  },
  // 批量删除应急管理，param.ids为逗号分割的id字符串
  removeBatchEmergencyManagement(param) {
    return axiosFn({ url: `/v1/emergencyManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增应急管理
  addBatchEmergencyManagement(param) {
    return axiosFn({ url: "/v1/emergencyManagement/batch/add", param, method: "post" });
  },
  /**
  * 调用目标管理-相关API
  */
  // 获取目标管理详情
  getTargetManagement(param) {
    return axiosFn({ url: `/v1/targetManagement/${param.id}` });
  },
  // 查询单条目标管理
  findOneTargetManagement(param) {
    return axiosFn({ url: "/v1/targetManagement/find/one", param });
  },
  // 获取目标管理列表
  queryTargetManagement(param) {
    return axiosFn({ url: "/v1/targetManagement", param });
  },
  // 新增目标管理
  addTargetManagement(param) {
    return axiosFn({ url: "/v1/targetManagement", param, method: "post" });
  },
  // 编辑目标管理
  editTargetManagement(param) {
    return axiosFn({ url: `/v1/targetManagement/${param.id}`, param, method: "put" });
  },
  // 删除目标管理，param为map
  removeTargetManagement(param) {
    return axiosFn({ url: "/v1/targetManagement", param, method: "delete" });
  },
  // 批量删除目标管理，param.ids为逗号分割的id字符串
  removeBatchTargetManagement(param) {
    return axiosFn({ url: `/v1/targetManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增目标管理
  addBatchTargetManagement(param) {
    return axiosFn({ url: "/v1/targetManagement/batch/add", param, method: "post" });
  },
  /**
  * 调用制度管理-相关API
  */
  // 获取制度管理详情
  getPolicyManagement(param) {
    return axiosFn({ url: `/v1/policyManagement/${param.id}` });
  },
  // 查询单条制度管理
  findOnePolicyManagement(param) {
    return axiosFn({ url: "/v1/policyManagement/find/one", param });
  },
  // 获取制度管理列表
  queryPolicyManagement(param) {
    return axiosFn({ url: "/v1/policyManagement", param });
  },
  // 新增制度管理
  addPolicyManagement(param) {
    return axiosFn({ url: "/v1/policyManagement", param, method: "post" });
  },
  // 编辑制度管理
  editPolicyManagement(param) {
    return axiosFn({ url: `/v1/policyManagement/${param.id}`, param, method: "put" });
  },
  // 删除制度管理，param为map
  removePolicyManagement(param) {
    return axiosFn({ url: "/v1/policyManagement", param, method: "delete" });
  },
  // 批量删除制度管理，param.ids为逗号分割的id字符串
  removeBatchPolicyManagement(param) {
    return axiosFn({ url: `/v1/policyManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增制度管理
  addBatchPolicyManagement(param) {
    return axiosFn({ url: "/v1/policyManagement/batch/add", param, method: "post" });
  },
  /**
  * 调用项目管理-相关API
  */
  // 获取项目管理详情
  getProjectManagement(param) {
    return axiosFn({ url: `/v1/projectManagement/${param.id}` });
  },
  // 查询单条项目管理
  findOneProjectManagement(param) {
    return axiosFn({ url: "/v1/projectManagement/find/one", param });
  },
  // 获取项目管理列表
  queryProjectManagement(param) {
    return axiosFn({ url: "/v1/projectManagement", param });
  },
  // 新增项目管理
  addProjectManagement(param) {
    return axiosFn({ url: "/v1/projectManagement", param, method: "post" });
  },
  // 编辑项目管理
  editProjectManagement(param) {
    return axiosFn({ url: `/v1/projectManagement/${param.id}`, param, method: "put" });
  },
  // 删除项目管理，param为map
  removeProjectManagement(param) {
    return axiosFn({ url: "/v1/projectManagement", param, method: "delete" });
  },
  // 批量删除项目管理，param.ids为逗号分割的id字符串
  removeBatchProjectManagement(param) {
    return axiosFn({ url: `/v1/projectManagement/delete/${param.ids}`, param, method: "delete" });
  },
  // 批量新增项目管理
  addBatchProjectManagement(param) {
    return axiosFn({ url: "/v1/projectManagement/batch/add", param, method: "post" });
  },
  //批量项目导出为Excel
  exportProjectManagement(param) {
    return downloadAxiosFn({
      url: "/v1/projectManagement/export",
      param,
      method: "get",
      fileName: "项目管理数据.xlsx"
    });
  },
  // 客户端类型 Web / H5 
  clientType() {
    return "Web";
  },
};
export default businessAxios;