var EntityData = Array();
function genRelation(data, entity) {
  EntityData = data;
  entity.attr.forEach(attribute => {
    attribute.relationOut.forEach(rel => {

      var color = "";
      if (entity.stage == 'landing' && rel.stage == 'staging') {
        color = '#F5717C';
      } else if (entity.stage == 'staging' && rel.stage == 'landing') {
        color = '#77B3FF';
      } else if (entity.stage == 'staging' && rel.stage == 'sor') {
        color = '#77B3FF';
      } else if (entity.stage == 'sor' && rel.stage == 'staging') {
        color = '#FB9D46';
      } else if (entity.stage == 'sor' && rel.stage == 'mart') {
        color = '#FB9D46';
      } else {
        color = '##78B847';
      }

      if ((entity.stage == 'staging' && rel.stage == 'landing') || (entity.stage == 'sor' && rel.stage == 'staging') || entity.stage == 'mart' && rel.stage == 'sor') {
        startDivX = document.getElementById('attr_' + entity.id + '_' + attribute.id).offsetLeft - 10;
        startDivY = document.getElementById('attr_' + entity.id + '_' + attribute.id).offsetTop + 78;
        endDivX = document.getElementById('attr_' + rel.entityId + '_' + rel.attributeId).offsetLeft + 115;
        endDivY = document.getElementById('attr_' + rel.entityId + '_' + rel.attributeId).offsetTop + 78;


        if (document.getElementById('attr_' + entity.id + '_' + attribute.id).offsetTop ===
          document.getElementById('attr_' + rel.entityId + '_' + rel.attributeId).offsetTop) {
          document.getElementById('wrapper_1').innerHTML += `
            <svg height="100%" width="100%" style="position: absolute;">
              <line x1="`+ startDivX + `" y1="` + startDivY + `" x2="` + endDivX + `" y2="` + endDivY + `" style="stroke:`+color+`;stroke-width:5" />
            </svg>
          `;
        } else {
          document.getElementById('wrapper_1').innerHTML += `
            <svg height="100%" width="100%" style="position: absolute;">
              <line x1="`+ startDivX + `" y1="` + startDivY + `" x2="` + (endDivX + 64) + `" y2="` + (startDivY) + `" style="stroke:`+color+`;stroke-width:5" />
              <line x1="`+ (endDivX + 64) + `" y1="` + startDivY + `" x2="` + (endDivX + 64) + `" y2="` + (endDivY) + `" style="stroke:`+color+`;stroke-width:5" />
              <line x1="`+ (endDivX + 64) + `" y1="` + endDivY + `" x2="` + endDivX + `" y2="` + (endDivY) + `" style="stroke:`+color+`;stroke-width:5" />
            </svg>
          `;
        }


      } else if ((entity.stage == 'landing' && rel.stage == 'staging') || (entity.stage == 'staging' && rel.stage == 'sor') || entity.stage == 'sor' && rel.stage == 'mart') {
        startDivX = document.getElementById('attr_' + entity.id + '_' + attribute.id).offsetLeft + 120;
        startDivY = document.getElementById('attr_' + entity.id + '_' + attribute.id).offsetTop + 78;
        endDivX = document.getElementById('attr_' + rel.entityId + '_' + rel.attributeId).offsetLeft - 10;
        endDivY = document.getElementById('attr_' + rel.entityId + '_' + rel.attributeId).offsetTop + 78;

        if (document.getElementById('attr_' + entity.id + '_' + attribute.id).offsetTop ===
          document.getElementById('attr_' + rel.entityId + '_' + rel.attributeId).offsetTop) {
          document.getElementById('wrapper_1').innerHTML += `
            <svg height="100%" width="100%" style="position: absolute;">
              <line x1="`+ startDivX + `" y1="` + startDivY + `" x2="` + endDivX + `" y2="` + endDivY + `" style="stroke:`+color+`;stroke-width:5" />
            </svg>
          `;
        } else {

          document.getElementById('wrapper_1').innerHTML += `
            <svg height="100%" width="100%" style="position: absolute;">
              <line x1="`+ startDivX + `" y1="` + startDivY + `" x2="` + (endDivX - 64) + `" y2="` + (startDivY) + `" style="stroke:`+color+`;stroke-width:5" />
              <line x1="`+ (endDivX - 64) + `" y1="` + startDivY + `" x2="` + (endDivX - 64) + `" y2="` + (endDivY) + `" style="stroke:`+color+`;stroke-width:5" />
              <line x1="`+ (endDivX - 64) + `" y1="` + endDivY + `" x2="` + endDivX + `" y2="` + (endDivY) + `" style="stroke:`+color+`;stroke-width:5" />
            </svg>
          `;
        }

      }

      checkRelation(rel.entityId, rel.attributeId);

    });
  });
}

function checkRelation(entityId, attributeId) {

  EntityData.forEach(stage => {
    stage.entity.forEach(entity => {
      if (entity.id === entityId) {
        entity.attr.forEach(attribute => {
          attribute.relationOut.forEach(rel => {

            var color = "";
            if (entity.stage == 'landing' && rel.stage == 'staging') {
              color = '#F5717C';
            } else if (entity.stage == 'staging' && rel.stage == 'landing') {
              color = '#77B3FF';
            } else if (entity.stage == 'staging' && rel.stage == 'sor') {
              color = '#77B3FF';
            } else if (entity.stage == 'sor' && rel.stage == 'staging') {
              color = '#FB9D46';
            } else if (entity.stage == 'sor' && rel.stage == 'mart') {
              color = '#FB9D46';
            } else {
              color = '##78B847';
            }

            if ((entity.stage == 'staging' && rel.stage == 'landing') || (entity.stage == 'sor' && rel.stage == 'staging') || entity.stage == 'mart' && rel.stage == 'sor') {
              startDivX = document.getElementById('attr_' + entity.id + '_' + attribute.id).offsetLeft - 10;
              startDivY = document.getElementById('attr_' + entity.id + '_' + attribute.id).offsetTop + 78;
              endDivX = document.getElementById('attr_' + rel.entityId + '_' + rel.attributeId).offsetLeft + 115;
              endDivY = document.getElementById('attr_' + rel.entityId + '_' + rel.attributeId).offsetTop + 78;

              if (document.getElementById('attr_' + entity.id + '_' + attribute.id).offsetTop ===
                document.getElementById('attr_' + rel.entityId + '_' + rel.attributeId).offsetTop) {
                document.getElementById('wrapper_1').innerHTML += `
                  <svg height="100%" width="100%" style="position: absolute;">
                    <line x1="`+ startDivX + `" y1="` + startDivY + `" x2="` + endDivX + `" y2="` + endDivY + `" style="stroke:`+color+`;stroke-width:5" />
                  </svg>
                `;
              } else {
                document.getElementById('wrapper_1').innerHTML += `
                  <svg height="100%" width="100%" style="position: absolute;">
                    <line x1="`+ startDivX + `" y1="` + startDivY + `" x2="` + (endDivX + 64) + `" y2="` + (startDivY) + `" style="stroke:`+color+`;stroke-width:5" />
                    <line x1="`+ (endDivX + 64) + `" y1="` + startDivY + `" x2="` + (endDivX + 64) + `" y2="` + (endDivY) + `" style="stroke:`+color+`;stroke-width:5" />
                    <line x1="`+ (endDivX + 64) + `" y1="` + endDivY + `" x2="` + endDivX + `" y2="` + (endDivY) + `" style="stroke:`+color+`;stroke-width:5" />
                  </svg>
                `;
              }


            } else if ((entity.stage == 'landing' && rel.stage == 'staging') || (entity.stage == 'staging' && rel.stage == 'sor') || entity.stage == 'sor' && rel.stage == 'mart') {
              startDivX = document.getElementById('attr_' + entity.id + '_' + attribute.id).offsetLeft + 120;
              startDivY = document.getElementById('attr_' + entity.id + '_' + attribute.id).offsetTop + 78;
              endDivX = document.getElementById('attr_' + rel.entityId + '_' + rel.attributeId).offsetLeft - 10;
              endDivY = document.getElementById('attr_' + rel.entityId + '_' + rel.attributeId).offsetTop + 78;

              if (document.getElementById('attr_' + entity.id + '_' + attribute.id).offsetTop ===
                document.getElementById('attr_' + rel.entityId + '_' + rel.attributeId).offsetTop) {
                document.getElementById('wrapper_1').innerHTML += `
                  <svg height="100%" width="100%" style="position: absolute;">
                    <line x1="`+ startDivX + `" y1="` + startDivY + `" x2="` + endDivX + `" y2="` + endDivY + `" style="stroke:`+color+`;stroke-width:5" />
                  </svg>
                `;
              } else {

                document.getElementById('wrapper_1').innerHTML += `
                  <svg height="100%" width="100%" style="position: absolute;">
                    <line x1="`+ startDivX + `" y1="` + startDivY + `" x2="` + (endDivX - 64) + `" y2="` + (startDivY) + `" style="stroke:`+color+`;stroke-width:5" />
                    <line x1="`+ (endDivX - 64) + `" y1="` + startDivY + `" x2="` + (endDivX - 64) + `" y2="` + (endDivY) + `" style="stroke:`+color+`;stroke-width:5" />
                    <line x1="`+ (endDivX - 64) + `" y1="` + endDivY + `" x2="` + endDivX + `" y2="` + (endDivY) + `" style="stroke:`+color+`;stroke-width:5" />
                  </svg>
                `;
              }

            }

          });
        });
      }
    });
  });
}
