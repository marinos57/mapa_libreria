<h1 class="text-center">MAPA Y SUS COORDENADAS</h1>

<div class="row justify-content-center mt-2">
    <div class="row mt-2">
        <div class="col-1 mt-2"></div>
        <div class="col-2 mt-2" >
            <button class="btn btn-info" id="actualizar" name="actualizar">Buscar marcadores</button>
        </div>
        <div class="col-4 mt-2" >
            <button class="btn btn-danger" id="quitar" name="quitar">Quitar marcadores...</button>
        </div>
    </div>
    <div class="col-lg-11 border rounded mt-2" id="mapa" style="height: 60vh; min-height:auto "></div>
</div>

<script src="<?= asset('./build/js/mapas/index.js') ?>"></script>


