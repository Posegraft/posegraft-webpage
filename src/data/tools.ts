/**
 * The real MCP tool surface of the PoseGraft simulator, verbatim from
 * mcp_server (v0.8.2). Single source of truth for every section that
 * cites tool names or counts — nothing on the page hardcodes "69".
 */

export type ToolGroup = {
  name: string
  blurb: string
  tools: string[]
}

export const TOOL_GROUPS: ToolGroup[] = [
  {
    name: 'Scene',
    blurb: 'The scene graph itself — create, move, group, select, undo.',
    tools: [
      'posegraft_scene_create',
      'posegraft_scene_rename',
      'posegraft_scene_transform',
      'posegraft_scene_reparent',
      'posegraft_scene_duplicate',
      'posegraft_scene_delete',
      'posegraft_scene_combine',
      'posegraft_scene_set_visibility',
      'posegraft_scene_set_selection',
      'posegraft_scene_undo',
      'posegraft_scene_redo',
    ],
  },
  {
    name: 'Mechanisms',
    blurb: 'Turn any imported mesh into moving equipment.',
    tools: [
      'posegraft_mechanism_create',
      'posegraft_mechanism_update',
      'posegraft_mechanism_delete',
      'posegraft_mechanism_validate',
      'posegraft_mechanism_preview',
      'posegraft_mechanism_set_value',
      'posegraft_mechanism_set_progress',
    ],
  },
  {
    name: 'Assets',
    blurb: 'Search the library, import CAD, place it in the scene.',
    tools: [
      'posegraft_filesystem_list',
      'posegraft_library_search',
      'posegraft_asset_import_file',
      'posegraft_asset_import_folder',
      'posegraft_asset_import_status',
      'posegraft_asset_instantiate',
      'posegraft_asset_remove',
    ],
  },
  {
    name: 'Simulation',
    blurb: 'Drive robots, grippers, conveyors — and put it all back.',
    tools: [
      'posegraft_simulation_ik_solve',
      'posegraft_simulation_move_pose',
      'posegraft_simulation_move_joints',
      'posegraft_simulation_move_to_object',
      'posegraft_simulation_gripper_set',
      'posegraft_simulation_attach',
      'posegraft_simulation_detach',
      'posegraft_simulation_conveyor_set_running',
      'posegraft_simulation_conveyor_move_to_stop',
      'posegraft_simulation_stop',
      'posegraft_simulation_reset',
    ],
  },
  {
    name: 'Programs',
    blurb: 'Author and run block programs, flow by flow or all at once.',
    tools: [
      'posegraft_program_replace',
      'posegraft_program_flow_create',
      'posegraft_program_flow_rename',
      'posegraft_program_flow_delete',
      'posegraft_program_block_add',
      'posegraft_program_block_update_args',
      'posegraft_program_block_delete',
      'posegraft_program_block_move',
      'posegraft_program_validate',
      'posegraft_program_run_node',
      'posegraft_program_run_flow',
      'posegraft_program_run',
      'posegraft_program_stop',
      'posegraft_program_restore',
    ],
  },
  {
    name: 'Spatial & observability',
    blurb: 'Measure, teach, screenshot, record, replay — the agent’s eyes.',
    tools: [
      'posegraft_spatial_bounds',
      'posegraft_spatial_measure_distance',
      'posegraft_teach_target_create',
      'posegraft_teach_target_update',
      'posegraft_teach_target_delete',
      'posegraft_face_mate',
      'posegraft_scene_validate',
      'posegraft_viewport_screenshot',
      'posegraft_replay_start',
      'posegraft_replay_stop',
      'posegraft_replay_reset',
      'posegraft_replay_export',
      'posegraft_simulation_recording_status',
      'posegraft_simulation_recording_start',
      'posegraft_simulation_recording_stop',
      'posegraft_simulation_recording_reset',
      'posegraft_simulation_recording_export',
      'posegraft_operation_journal_clear',
    ],
  },
  {
    name: 'Diagnostics',
    blurb: 'Is the simulator up and every local service ready?',
    tools: ['posegraft_diagnose'],
  },
]

export const TOOL_COUNT = TOOL_GROUPS.reduce((n, g) => n + g.tools.length, 0)

// ponytail: self-check — the page derives every count from this file,
// so a wrong list shows up here in dev instead of silently on the site.
if (import.meta.env.DEV && TOOL_COUNT !== 69) {
  console.error(`tools.ts: expected 69 MCP tools, found ${TOOL_COUNT}`)
}
